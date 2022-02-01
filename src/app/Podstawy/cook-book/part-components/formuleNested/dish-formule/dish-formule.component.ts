import { Component, ElementRef, EventEmitter, Input, OnInit, Optional, Output, Self } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, first, map, tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dish, DishType, Measure } from '../../../types';
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
  // finalCombine$ = new BehaviorSubject<Dish>({ dishId: '', dishType: [], name: '', products: [], tags: [], steps: [] });
  modelClone;
  filteredOptions: Observable<string[]>;

  @Input() set dish(value: Array<{ day: string, meals: Array<{ meal: string, dishes: Array<{ dish: string }> }> }>) {
    this.forms.patchValue(value, { emitEvent: false });
  }

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
      ));
    // this.forms.valueChanges.pipe(
    //   this.filteredOptions = this.forms.valueChanges.pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
    // tap((value: {
    //   dish: string,
    // }) => {
    //   this.dishesList$.pipe(first()).subscribe((dishes) => {
    //
    //   });
    // })
    // ));
  }

  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //
  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }
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

  displayFn(givenDishId) {
    let dishName = '';
    if (!!givenDishId) {
      const selectedDish = this.dishesList$.pipe(
        map((dishes) => {
          return dishes.find(
            ({ dishId }) =>
              dishId === givenDishId
          )?.name;
        }));
      selectedDish.pipe(first()).subscribe(dishName$ => dishName = dishName$);
    }
    return dishName;
  }
}

