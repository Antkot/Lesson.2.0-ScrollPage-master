import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'aaa'
})
export class AaaPipe implements PipeTransform {
  transform(toMove: any, selected: any): string {
    switch (String(toMove) + String(selected)) {
      case 'truetrue': {
        return 'movable';
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
        return 'movable'; //nie ma
        break;
      }
      case 'bb': {
        return 'bTurn';
        break;
      }
      case 'ww': {
        return 'wTurn';
        break;
      }
    }
  }
}
