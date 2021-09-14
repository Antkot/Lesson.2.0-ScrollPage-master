import { Pipe, PipeTransform } from '@angular/core';
import { LoadingService } from '../part-components/services/loading.service';
import { Dish } from '../types';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'dishType'
})
export class DishTypePipe implements PipeTransform {

  data$;
  data;
  dishesTypes$: Observable<Array<Dish>> = this.dishService.dishes$;
  temporary;
  constructor(private dishService: LoadingService) {
  }

  // transform(givenId: string): any {
  transform(givenId: Array<{ dishId: string }>): any {
    this.dishesTypes$.forEach(value => value.pipe(
      map((tag) => ({
        dish: tag.find(
          ({ dishId, name }) =>
            dishId === givenId
        )
      }))));
    this.data$.subscribe(data => this.data = data);
    return this.data.dish.name;
  }
}
