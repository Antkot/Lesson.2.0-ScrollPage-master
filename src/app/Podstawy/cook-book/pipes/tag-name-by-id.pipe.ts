import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagNameById'
})
export class TagNameByIdPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
