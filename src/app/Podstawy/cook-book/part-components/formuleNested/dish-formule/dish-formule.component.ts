import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';
import { Observable } from 'rxjs';
import { Dish, DishType } from '../../../types';
import { LoadingService } from '../../services/loading.service';
import { DishStorageService } from '../../services/dish-storage.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-fourth',
  templateUrl: './dish-formule.component.html',
  styleUrls: ['./dish-formule.component.scss']
})
export class DishFormuleComponent extends AliveState implements OnInit {
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  @Output() dataSync = new EventEmitter();
  forms = this.fb.array([]);

  @Input() set dish(value: string) {JSON.parse(value).forEach(
    ({ dish }, index) => {
      if (!!this.forms.controls[index]) {
        this.forms.setControl(
          index, new FormGroup({ dish: new FormControl(dish)}));
      } else {
        this.forms.push(
          new FormGroup({ dish: new FormControl(dish)}));
      }
    });
  }


  constructor(
    private fb: FormBuilder,
    private dishesService: DishStorageService,
  ) {
    super();
  }


  ngOnInit() {
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          this.dataSync.emit(JSON.stringify(value));
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

