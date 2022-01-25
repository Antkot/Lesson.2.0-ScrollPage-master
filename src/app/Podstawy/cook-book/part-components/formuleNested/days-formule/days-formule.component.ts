import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';
import { parse } from 'path';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-formule-input',
  templateUrl: './days-formule.component.html',
  styleUrls: ['./days-formule.component.scss']
})
export class DaysFormuleComponent extends AliveState
  implements OnInit {
  @Output() dataSync = new EventEmitter();
  forms = this.fb.array([]);
  movies = [
    'Episode I - The Phantom Menace',
    'Episode II - Attack of the Clones',
    'Episode III - Revenge of the Sith',
    'Episode IV - A New Hope',
    'Episode V - The Empire Strikes Back',
    'Episode VI - Return of the Jedi',
    'Episode VII - The Force Awakens',
    'Episode VIII - The Last Jedi',
    'Episode IX – The Rise of Skywalker',
  ];
  @Input() set days(value: string) {
    this.meals = [...JSON.parse(value).map(({ meals }) => JSON.stringify(meals))];
    JSON.parse(value).forEach(
      ({ day, meals }, index) => {
        if (!!this.forms.controls[index]) {
          this.forms.setControl(
            index, new FormGroup({ day: new FormControl(day), meals: new FormControl(meals) }));
        } else {
          this.forms.push(
            new FormGroup({ day: new FormControl(day), meals: new FormControl(meals) }));
        }
      });
  }

  _meals: Array<string> = [];
  set meals(value: Array<string>) {
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
          this.meals = [...value.map(({ meals }) => JSON.stringify(meals))];
          this.dataSync.emit(JSON.stringify(value));
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

  dataBackup(returnedData: string, index: number, eventEmitter: boolean) {
    const model = [];
    Object.entries({ ...this.forms.value }).forEach(
      (x: {}) => {
        model.push({
          day: x[1].day,
          meals: Number(x[0]) === index ? JSON.parse(returnedData) : x[1].meals
        });
      });
    this.forms.setValue(model, { emitEvent: eventEmitter });
  }

  remove(index) {
    this.forms.removeAt(index);
  }
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.forms.controls, event.previousIndex, event.currentIndex);
  }

}
