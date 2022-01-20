import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { AliveState } from '../../../../ActiveState';
import { parse } from 'path';

@Component({
  selector: 'app-formule-input',
  templateUrl: './formule-input.component.html',
  styleUrls: ['./formule-input.component.scss']
})
export class FormuleInputComponent extends AliveState
  implements OnInit {
  @Output() returnData = new EventEmitter();
  forms = this.fb.array([]);

  @Input() set days(value: string) {
    const model = JSON.parse(value);
    // model.forEach(({ day, meals }, index) => {
    //   this.forms.setControl(index,
    //     new FormGroup({
    //       day: new FormControl(day),
    //       meals: new FormControl(meals)
    //     })
    //   );
    // });
    const _forms = [];
    Object.entries(model ).forEach(
      (x: {}) => {
        _forms.push({
          day: x[1].day,
          meals: x[1].meals
        });
      });
    this.forms.setValue(_forms, {emitEvent: false});
  }

  _meals: Array<string> = [];
  set meals(value: Array<string>) {
    console.log('meals', value);
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
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          console.log('dodanie', value);
          this.meals = [ ...value.map(({ meals }) => JSON.stringify(meals)) ];
          console.log('do rodzica', value);
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
        meals: new FormControl([])
      })
    );
  }

  returnedData(returnedData: string, index: number) {
    const model = [];
    Object.entries({ ...this.forms.value }).forEach(
      (x: {}) => {
        model.push({
          day: x[1].day,
          meals: Number(x[0]) === index ? JSON.parse(returnedData) : x[1].meals
        });
      });
    this.forms.setValue(model);
  }
}
