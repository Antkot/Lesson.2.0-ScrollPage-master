import { TablicaToDo } from '../to-do-list/to-do-list.component.stories';


export interface DishType {
  dishId: string;
  name: string;
}

export interface Hash {
  hashId: string;
  name: string;
}

export interface Timer {
  timeId: string;
  name: string;
}

export interface Dish {
  dishId: string;
  name: string;
  tags: Array<{ hashId: string }>;
  steps: Array<string>;
  products: Array<{ usedProductId: string }>;
  dishType: Array<{ dishId: string }>;
}

export interface Level {
  levelId: string;
  level: number;
}

export interface Measure {
  measureId: string;
  shortcut: string;
  name: string;
}

export interface Product {
  productId: string;
  name: string;
  measures: Array<{ measureId: string, kcal: number }>;
  allergens: Array<{ allergenId: string }>;
}

export interface UsedProduct {
  usedProductId: string;
  productId: string;
  measuresId: string;
  amount: number;
}
