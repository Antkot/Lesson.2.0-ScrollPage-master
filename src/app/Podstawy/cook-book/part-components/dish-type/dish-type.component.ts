import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { DishType } from '../../types';
import { LoadingService } from '../services/loading.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-dish-type',
  templateUrl: './dish-type.component.html',
  styleUrls: ['./dish-type.component.scss']
})
export class DishTypeComponent implements OnInit {
  dishes$: Observable<Array<DishType>> = this.loadingService.dishes$;
  selectedDishes: Array<string>;
  @Input() edit: boolean;
  model = this.fb.group(
    {
      ['inne']: true,
      ['launch']: false,
      ['desery']: false,
      ['kolacja']: false,
      ['obiad']: false,
      ['śniadanie']: false
    });
  @Output() typeOfDish = new EventEmitter();

  constructor(private loadingService: LoadingService, private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  chosenType() {
    this.typeOfDish.emit(this.model.value);
  }
}
