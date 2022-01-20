import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../ActiveState';
import { parse } from 'path';

@Component({
  selector: 'app-formule-input',
  templateUrl: './formule-input.component.html',
  styleUrls: ['./formule-input.component.scss']
})
export class FormuleInputComponent extends AliveState
  implements OnInit {
  forms = this.fb.array([]);
  @Output() returnData = new EventEmitter();
  @Input() set days(value: string) {
    const model = JSON.parse(value);
    model.forEach(({day, meals}) => {
      this.forms.push(
        new FormGroup({
          day: new FormControl(day),
          meals: new FormControl(meals)
        })
      );
    });
  }

  _meals: Array<{ meal: string, hour: string, dishes: Array<{dish: string}> }> = [];
  set meals(value: Array<{ meal: string, hour: string, dishes: Array<{dish: string}> }>) {
    this._meals = value;
  }

  get meals() {
    return this._meals;
  }

  constructor(
    private fb: FormBuilder
  ) {
    super();
  }


  ngOnInit(): void {
    this.returnData.emit(JSON.stringify(this.forms.value));
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          this.meals = value.map(({ meals }) => JSON.stringify(meals));
          console.table(this.meals);
          this.returnData.emit(JSON.stringify(value));
        })
      )
    );
  }

  add() {
    this.forms.push(
      new FormGroup({
        day: new FormControl(
          `dzień ${this.forms.value.length + 1}`),
        meals: new FormControl([{
          meal: 'Nowy',
          hour: '15:15',
          dishes: [{ dish: `Chleb 2` }],
        }])
      })
    );
  }
  returnedData(returnedData: string, index: number) {
    this.forms.value.find(
      ({ day }) =>
        day === this.forms.value[index].day
    ).meals = JSON.parse(returnedData);
  }
}
