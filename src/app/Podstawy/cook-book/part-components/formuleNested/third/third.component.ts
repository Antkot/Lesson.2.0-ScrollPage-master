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
  @Output() dataForwarder = new EventEmitter();
  forms = this.fb.array([]);

  @Input() set meals(value: string) {
    console.log('budowanie', value);
    const model = JSON.parse(value);
    // model.forEach(({ meal, hour, dishes }, index) => {
    //   this.forms.setControl(index,
    //     new FormGroup({
    //       meal: new FormControl(meal),
    //       hour: new FormControl(hour),
    //       dishes: new FormControl(dishes)
    //     })
    //   );
    // });
    const _forms = [];
    Object.entries(model).forEach(
      (x: {}) => {
        _forms.push({
          meal: x[1].meal,
          hour: x[1].hour,
          dishes: x[1].dishes
        });
      });
    this.forms.setValue(_forms, {emitEvent: false});
  }

  _dishes: Array<string> = [];
  set dishes(value: Array<string>) {
    this._dishes = value;
  }

  get dishes() {
    return this._dishes;
  }


  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          this.dishes = [...value.map(({ dishes }) => JSON.stringify(dishes))];
          this.dataForwarder.emit(JSON.stringify(value)
          );
        }))
    );
  }

  addForm() {
    this.forms.push(
      new FormGroup({
        meal: new FormControl(
          `posiłek ${this.forms.value.length + 1}`),
        hour: new FormControl(
          `12:00`),
        dishes: new FormControl([])
      })
    );
  }

  dataBackup(returnedData: string, index: number) {
    const model = [];
    Object.entries({ ...this.forms.value }).forEach(
      (x: {}) => {
        model.push({
          meal: x[1].meal,
          hour: x[1].hour,
          dishes: Number(x[0]) === index ? JSON.parse(returnedData) : x[1].dishes
        });
      });
    this.forms.setValue(model);
  }
}
