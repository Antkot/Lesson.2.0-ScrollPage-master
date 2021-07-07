import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aaa'
})
export class AaaPipe implements PipeTransform {

  transform(value1: number, value2: boolean): string {
    return `${value1}${Number(value2) * 2 - 5}`;
  }

}
