import { Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';
import { Observable } from 'rxjs';
import { Dish, DishType } from '../../../types';
import { LoadingService } from '../../services/loading.service';
import { DishStorageService } from '../../services/dish-storage.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AbstractValueAccessor } from '../formControl';

@Component({
  selector: 'app-fourth',
  templateUrl: './dish-formule.component.html',
  styleUrls: ['./dish-formule.component.scss']
})
export class DishFormuleComponent extends AbstractValueAccessor implements OnInit {
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  @Output() dataSync = new EventEmitter();
  forms = this.fb.array([]);

  @Input() set dish(value: Array<{ day: string, meals: Array<{ meal: string, dishes: Array<{ dish: string }> }> }>) {
    this.forms.patchValue(value, { emitEvent: false });
  }

  // @Input() set dish(value: string) {JSON.parse(value).forEach(
  //   ({ dish }, index) => {
  //     if (!!this.forms.controls[index]) {
  //       this.forms.setControl(
  //         index, new FormGroup({ dish: new FormControl(dish)}));
  //     } else {
  //       this.forms.push(
  //         new FormGroup({ dish: new FormControl(dish)}));
  //     }
  //   });
  // }
  //

  constructor(
    public elementRef: ElementRef,
    @Self()
    @Optional()
    public ngControl: NgControl,
    private fb: FormBuilder,
    private dishesService: DishStorageService
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
            ({ dish }) => {
              this.forms.push(
                new FormGroup({ dish: new FormControl(dish) }));
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
        dish: new FormControl(`Danie ${this.forms.value.length + 1}`)
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

