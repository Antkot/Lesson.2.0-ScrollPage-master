import { Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AbstractValueAccessor } from '../formControl';

@Component({
  selector: 'app-third',
  templateUrl: './meal-formule.component.html',
  styleUrls: ['./meal-formule.component.scss']
})
export class MealFormuleComponent extends AbstractValueAccessor implements OnInit {
  forms = this.fb.array([]);

  // @Input() set meals(value: Array<{ meal: string, dishes: Array<{ dish: string }> }>) {
  //   this.forms.patchValue(value, { emitEvent: false });
  // }

  // @Input() set meals(value: string) {
  //   this.dishes = [...JSON.parse(value).map(({ dishes }) => JSON.stringify(dishes))];
  //   JSON.parse(value).forEach(
  //     ({ meal, hour,  dishes }, index) => {
  //       if (!!this.forms.controls[index]) {
  //         this.forms.setControl(
  //           index, new FormGroup({ meal: new FormControl(meal), hour: new FormControl(hour), meals: new FormControl(dishes) }));
  //       } else {
  //         this.forms.push(
  //           new FormGroup({ meal: new FormControl(meal), hour: new FormControl(hour), dishes: new FormControl(dishes) }));
  //       }
  //     });
  // }

  // _dishes: Array<string> = [];
  // set dishes(value: Array<string>) {
  //   this._dishes = value;
  // }
  //
  // get dishes() {
  //   return this._dishes;
  // }

  constructor(
    public elementRef: ElementRef,
    @Self()
    @Optional()
    public ngControl: NgControl,
    private fb: FormBuilder
  ) {
    super();
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    let updateInProgress = false;
    this.subscribeWhileAlive(
      this.valueSubject.pipe(
        filter(() => !updateInProgress),
        tap((currentValue) => {
          updateInProgress = true;
          currentValue.forEach(
            ({ meal, hour, dishes }) => {
              this.forms.push(
                new FormGroup({
                  meal: new FormControl(meal),
                  hour: new FormControl(hour),
                  dishes: new FormControl(dishes)
                }));
            });
          updateInProgress = false;
        })
      ),

      this.forms.valueChanges.pipe(
        filter(() => !updateInProgress),
        tap((currentValue) => {
          updateInProgress = true;
          this.writeValue(currentValue);
          updateInProgress = false;
        })
      )
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
