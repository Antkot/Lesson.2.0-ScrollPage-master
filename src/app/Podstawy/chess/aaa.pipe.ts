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
        return null;
        break;
      }
      case 'falsefalse': {
        return null;
        break;
      }
      case 'truefalse': {
        return 'movable';
        break;
      }
    }
  }
}
