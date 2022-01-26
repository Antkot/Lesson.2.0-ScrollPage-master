import { Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';
import { parse } from 'path';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { AbstractValueAccessor } from '../formControl';

@Component({
  selector: 'app-formule-input',
  templateUrl: './days-formule.component.html',
  styleUrls: ['./days-formule.component.scss']
})
export class DaysFormuleComponent extends AbstractValueAccessor
  implements OnInit {
  forms = this.fb.array([]);

  constructor(
    public elementRef: ElementRef,
    @Self()
    @Optional()
    public ngControl: NgControl,
    private fb: FormBuilder,
  ) {
    super();
    this.ngControl.valueAccessor = this;
  }


  ngOnInit(): void {
    // this.subscribeWhileAlive(
    //   this.forms.valueChanges.pipe(
    //     tap((value) => {
    //       console.log(value);
    //       this.meals = [...value.map(({ meals }) => JSON.stringify(meals))];
    //       this.dataSync.emit(JSON.stringify(value));
    //     })
    //   )
    // );

    this.subscribeWhileAlive(
      this.valueSubject.pipe(
        tap((currentValue) => {
          // this.forms.patchValue(currentValue);
            // this.days = this.forms.value;
        })
      ),
      this.forms.valueChanges.pipe(
        tap((currentValue) => {
            this.writeValue(currentValue);
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
  // dataBackup(returnedData: string, index: number, eventEmitter: boolean) {
  //   const model = [];
  //   Object.entries({ ...this.forms.value }).forEach(
  //     (x: {}) => {
  //       model.push({
  //         day: x[1].day,
  //         meals: Number(x[0]) === index ? JSON.parse(returnedData) : x[1].meals
  //       });
  //     });
  //   this.forms.setValue(model, { emitEvent: eventEmitter });
  // }

  remove(index) {
    this.forms.removeAt(index);
  }

  drop(event: CdkDragDrop<FormGroup[]>) {
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;

    const from = event.previousIndex;
    const to = event.currentIndex;

    const temp = this.forms.at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = this.forms.at(i + dir);
      this.forms.setControl(i, current);
    }
    this.forms.setControl(to, temp);
  }


}
