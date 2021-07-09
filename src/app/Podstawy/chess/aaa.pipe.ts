import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aaa'
})
export class AaaPipe implements PipeTransform {
  transform(toMove: boolean, selected: boolean): string {
    switch (String(toMove) + String(selected)) {
      case 'truetrue': {
        return 'selected';
        break;
      }
      case 'falsetrue': {
        return 'nothing';
        break;
      }
      case 'falsefalse': {
        return 'nothing';
        break;
      }
      case 'truefalse': {
        return 'movable';
        break;
      }
    }
  }
}
