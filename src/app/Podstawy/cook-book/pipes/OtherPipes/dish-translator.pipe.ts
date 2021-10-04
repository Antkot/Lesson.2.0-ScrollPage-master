import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Dish } from '../../types';
import { map } from 'rxjs/operators';
import { DishStorageService } from '../../part-components/services/dish-storage.service';

@Pipe({
  name: 'dishTranslator'
})
export class DishTranslatorPipe implements PipeTransform {
  dishesList$: Observable<Array<Dish>> = this.dishService.dishesList$;
  constructor(private dishService: DishStorageService) {}

  transform(linkId: string, search: string) {
    return this.dishesList$.pipe(
      map((dishes) => {
        return dishes.find(
          ({ dishId }) =>
            dishId === linkId
        ) ? dishes.find(
          ({ dishId }) =>
            dishId === linkId
        )?.[search] : '';
      }));
  }
}
