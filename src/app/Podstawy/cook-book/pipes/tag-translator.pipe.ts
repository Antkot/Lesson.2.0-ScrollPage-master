import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'tagTranslator'
})
export class TagTranslatorPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
