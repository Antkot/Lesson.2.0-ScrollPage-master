import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
@Component({
  selector: 'app-chips',
  templateUrl: 'chips.component.html',
  styleUrls: ['chips.component.scss']
})
export class ChipsComponent {
  @Input() entity: string;
  selectable = true;
  @Input() removable = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  elementCtrl = new FormControl();
  filteredElements: Observable<Array<string>>;
  @Output() add = new EventEmitter();
  @Input() chipColor = 'none';
  @Input() elements: Array<string> = ['Laktoza', 'Gluten', 'Soja', 'Orzechy', 'Gorczyca'];
  @Input() allElements: Array<string> = ['Laktoza', 'Gluten', 'Soja', 'Orzechy', 'Gorczyca'];

  @ViewChild('elementInput') elementInput: ElementRef<HTMLInputElement>;

  constructor() {
    // this.filteredElements = this.elementCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((element: string | null) => element ? this._filter(element) : this.allElements.slice()));
  }

  // add(event: MatChipInputEvent): void {
  //   let value = (event.value || '').trim();
  //   value = this.titleCaseWord(value);
  //   console.log(value.length);
  //   if (value) {
  //     if (!this.elements.includes(value)) {
  //       this.elements.push(value);
  //     }
  //     if (!this.allElements.includes(value)) {
  //       this.allElements.push(value);
  //     }
  //   }
  //   event.input.value = '';
  //   this.elementCtrl.setValue(null);
  // }

  remove(element: string): void {
    // const index = this.elements.indexOf(element);
    // if (index >= 0) {
    //   this.elements.splice(index, 1);
    // }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // const added = this.titleCaseWord(event.option.viewValue);
    // if (!this.elements.includes(added)) {
    //   this.elements.push(added);
    // }
    // this.elementInput.nativeElement.value = '';
    // this.elementCtrl.setValue(null);
  // }
  //
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();
  //   return this.allElements.filter(element => element.toLowerCase().includes(filterValue));
  }


  titleCaseWord(word: string) {
    if (!word) {
      return word;
    }
    if (this.entity === 'Tag') {
      const i = this.hashSeeker(word);
      return '#' + word[i].toUpperCase() + word.substr(i + 1).toLowerCase();
    } else {
      return word[0].toUpperCase() + word.substr(1).toLowerCase();
    }
  }

  hashSeeker(word: string) {
    for (let i = 0; i < word.length; i++) {
      if (word[i] !== '#') {
        return i;
      }
    }
    return 0;
  }

}
