import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';

@Component({
  selector: 'app-third',
  templateUrl: './meal-formule.component.html',
  styleUrls: ['./meal-formule.component.scss']
})
export class MealFormuleComponent extends AliveState implements OnInit {
  @Output() dataSync = new EventEmitter();
  forms = this.fb.array([]);

  @Input() set meals(value: string) {
    this.dishes = [...JSON.parse(value).map(({ dishes }) => JSON.stringify(dishes))];
    JSON.parse(value).forEach(
      ({ meal, hour,  dishes }, index) => {
        if (!!this.forms.controls[index]) {
          this.forms.setControl(
            index, new FormGroup({ meal: new FormControl(meal), hour: new FormControl(hour), meals: new FormControl(dishes) }));
        } else {
          this.forms.push(
            new FormGroup({ meal: new FormControl(meal), hour: new FormControl(hour), dishes: new FormControl(dishes) }));
        }
      });
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
          this.dataSync.emit(JSON.stringify(value)
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

  dataBackup(returnedData: string, index: number, eventEmitter: boolean) {
    const model = [];
    Object.entries({ ...this.forms.value }).forEach(
      (x: {}) => {
        model.push({
          meal: x[1].meal,
          hour: x[1].hour,
          dishes: Number(x[0]) === index ? JSON.parse(returnedData) : x[1].dishes
        });
      });
    this.forms.setValue(model, {emitEvent: eventEmitter});
  }
  remove(index) {
    this.forms.removeAt(index);
  }
}
