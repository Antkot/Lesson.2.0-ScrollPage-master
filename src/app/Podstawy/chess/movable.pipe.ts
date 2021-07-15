import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'movable'
})
export class MovablePipe implements PipeTransform {

  transform(oldSelect: number, toMove: boolean) {
    if (toMove === true) {
    return 'movable';
    }
    return null;
  }

}
