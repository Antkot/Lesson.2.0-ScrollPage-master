import { TablicaToDo } from '../to-do-list/to-do-list.component.stories';
import { number } from '@storybook/addon-knobs';


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

export interface AddedProductType {
  duplicateState: boolean;
  product: { product: string, measure: string, kcal: number, allergens: Array<{ allergenId: '' }> };
}

export interface AddedUsedProductType {
  product: string;
  measure: string;
  amount: number;
}

export interface BothIdType {
  givenMeasureId: string;
  givenProductId: string;
}

export interface PlanList {
  planListId: string;
  planListName: string;
  plans: Array<Plan>;
}

export interface Plan {
  planId: string;
  planName: string;
  days: Day; // form array
}

export interface  Day { // form array
  dayId: string;
  dayNumber: number;
  dishList: Array<{
    dishes: Array<Dish>,
    hour: string,
    name: string
  }>;
}
