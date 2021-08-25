import { TablicaToDo } from '../to-do-list/to-do-list.component.stories';


export interface Dish {
  dishId: string;
  name: string;
}
export interface Dishes {
  dishId: string;
  name: string;
  tags: Array<string>;
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
export interface Levels {
  levelId: string;
  level: number;
}
export interface Measures {
  nameId: string;
  measure: string;
  shortcut: string;
}
export interface Products {
  nameId: string;
  product: string;
  allergens: Array<string>;
}
