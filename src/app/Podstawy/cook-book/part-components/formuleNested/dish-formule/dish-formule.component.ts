import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';
import { Observable } from 'rxjs';
import { Dish, DishType } from '../../../types';
import { LoadingService } from '../../services/loading.service';
import { DishStorageService } from '../../services/dish-storage.service';

@Component({
  selector: 'app-fourth',
  templateUrl: './dish-formule.component.html',
  styleUrls: ['./dish-formule.component.scss']
})
export class DishFormuleComponent extends AliveState implements OnInit {
  dishesList$: Observable<Array<Dish>> = this.dishesService.dishesList$;
  @Output() dataSync = new EventEmitter();
  forms = this.fb.array([]);

  @Input() set dish(value: string) {
    const model = JSON.parse(value);
    const _forms = [];
    Object.entries(model).forEach(
      (x: {}) => {
        _forms.push({
          dish: x[1].dish
        });
      });
    this.forms.setValue(_forms, { emitEvent: false });
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
}

