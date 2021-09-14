import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { Dishes } from '../types';
import { map } from 'rxjs/operators';
import { DishStorageService } from '../part-components/services/dish-storage.service';

@Pipe({
  name: 'dishTranslator'
})
export class DishTranslatorPipe implements PipeTransform {
  data$;
  data;
  dishesList$: Observable<Array<Dishes>> = this.dishService.dishesList$;

  constructor(private dishService: DishStorageService) {
  }

  transform(linkId: string, search: string): any {
    this.data$ = this.dishesList$.pipe(
      map((tag) => ({
        dish: tag.find(
          ({ name, dishId }) =>
            dishId === linkId
        )
      })));
    this.data$.subscribe(data => this.data = data);
    console.log(search);
    switch (search) {
      case 'name': {
        return this.data.dish.name;
        break;
      }
      case 'products': {
        return this.data.dish.products;
        break;
      }
      case 'steps': {
        return this.data.dish.steps;
        break;
      }
      case 'tags': {
        return this.data.dish.tags;
        break;
      }
      case 'type': {
        return this.data.dish.dishType;
        break;
      }
      default: {
        return 'ERROR';
        break;
      }
    }
    // this.data.dish.measures
  }
}
