import { TablicaToDo } from '../to-do-list/to-do-list.component.stories';


export interface Dish {
  dishId: string;
  name: string;
}
export interface Dishes {
  dishId: string;
  name: string;
  tags: Array<{ hashId: string }>;
  steps: Array<string>;
  products: Array<{ productId: string }>;
}
export interface Hashes {
  hashId: string;
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
  measureId: string;
  measure: string;
  shortcut: string;
}
export interface Products {
  productId: string;
  product: string;
  kcal: number;
  measures: Array<{ measureId: string }>;
  allergens: Array<string>;
}
