import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'selector'
})
export class SelectorPipe implements PipeTransform {

  transform(oldSelect: number, i: number) {
    if (oldSelect === i) {
      return 'selected';
    } else {
      return null;
    }
  }

}
