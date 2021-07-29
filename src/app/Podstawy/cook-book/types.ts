import { TablicaToDo } from '../to-do-list/to-do-list.component.stories';


export interface Dish {
  dishId: string;
  name: string;
}
export interface Hashes {
  hashId: string;
  name: string;
}
export interface Allergen {
  allergenId: string;
  name: string;
}
export interface Timer {
  timeId: string;
  name: string;
}
export interface Level {
  levelId: string;
  name: string;
}
export interface Dishes {
  dish: Array<Dish>;
}
