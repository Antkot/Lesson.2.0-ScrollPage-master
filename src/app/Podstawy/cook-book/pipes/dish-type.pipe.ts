import { Pipe, PipeTransform } from '@angular/core';
import { LoadingService } from '../part-components/services/loading.service';
import { DishType } from '../types';
import { Observable, ObservableInput } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'dishType'
})
export class DishTypePipe implements PipeTransform {

  dishesTypes$: Observable<Array<DishType>> = this.dishService.dishes$;

  constructor(private dishService: LoadingService) {
  }

  transform(givenId: string) {
    return this.dishesTypes$.pipe(
      map((value) => {
        return value.find(
          ({ dishId, name }) =>
            dishId === givenId
        ).name;
      }));
  }
}

