import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent extends AliveState implements OnInit {
  @Output() returnData = new EventEmitter();

  @Input() set meals(value: string) {
    const model = JSON.parse(value);
    model.forEach(({meal, hour, dishes}) => {
      this.forms.push(
        new FormGroup({
          meal: new FormControl(meal),
          hour: new FormControl(hour),
          dishes: new FormControl(dishes)
        })
      );
    });
  }

  _dishes: Array<{dish: string}> = [];
  set dishes(value: Array<{dish: string}>) {
    this._dishes = value;
  }

  get dishes() {
    return this._dishes;
  }

  forms = this.fb.array([]);

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.returnData.emit(JSON.stringify(this.forms.value));
    this.dishes = this.forms.value.map(({ dishes }) => JSON.stringify(dishes));

    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          this.dishes = value.map(({ dishes }) => JSON.stringify(dishes));
          this.returnData.emit(JSON.stringify(value));
        })
      )
    );
  }

  addForm() {
    this.forms.push(
      new FormGroup({
        meal: new FormControl(
          `posiłek ${this.forms.value.length + 1}`,
          [Validators.maxLength(14)]),
        hour: new FormControl(
          `12:00`),
        dishes: new FormControl([{ dish: `Chleb` }])
      })
    );
  }
  returnedData(returnedData: string, index: number) {
    this.forms.value.find(
      ({ meal }) =>
        meal === this.forms.value[index].meal
    ).dishes = JSON.parse(returnedData);
  }
}
