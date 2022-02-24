import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'word'
})
export class WordPipe implements PipeTransform {

  transform(text: string): string {
    const remove = [' w ', ' z ', ' o ', ' i ', ' a ', ' u '];
    const insert = [' w\u00A0', ' z\u00A0;', ' o\u00A0', ' i\u00A0', ' a\u00A0', ' u\u00A0'];
    for (let x = 0; x < remove.length; x++) {
      text = this.replaceAll(text, remove[x], insert[x]);
    }
    return text;
  }
  replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }
}
