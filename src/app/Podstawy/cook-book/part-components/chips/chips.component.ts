import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipEvent, MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Hashes } from '../../types';
import { TagNameByIdPipe } from '../../pipes/tag-name-by-id.pipe';
import { TagsStorageService } from '../services/tags-storage.service';

@Component({
  selector: 'app-chips',
  templateUrl: 'chips.component.html',
  styleUrls: ['chips.component.scss']
})
export class ChipsComponent {
  @Output() add = new EventEmitter();
  @Output() remove = new EventEmitter();
  @Input() entity: string;
  @Input() removable = false;
  @Input() chipColor = 'none';
  @Input() elements: Array<Hashes>;
  @Input() allElements: Array<Hashes>;
  selectable = true;
  separatorKeysCodes = [ENTER, COMMA];
  elementCtrl = new FormControl();
  filteredElements$: Observable<Array<string>>;
  tags$: Observable<Array<Hashes>> = this.tagsService.tags$;


  @ViewChild('elementInput') elementInput: ElementRef<HTMLInputElement>;

  constructor(private tagsService: TagsStorageService) {
    // this.filteredElements$ = this.elementCtrl.valueChanges.pipe(
    //   startWith(null),
    //   map((element: string | null) => element ? this._filter(element) : this.allElements.slice()));
  }

  added(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
    if (value) {
      value = this.titleCaseWord(value);
      this.add.emit(value);
    }
    this.elementInput.nativeElement.value = '';
    this.elementCtrl.reset();
  }

  removed(element: Hashes): void {
    const index = this.elements.indexOf(element);
    this.remove.emit(index);
  }

// TODO przenieść do serivca
//   selected(event: MatAutocompleteSelectedEvent): void {
//     const added = this.titleCaseWord(event.option.viewValue);
//     if (!this.elements.includes(added)) {
//       this.elements.push(added);
//     }
//     this.elementInput.nativeElement.value = '';
//     this.elementCtrl.setValue(null);
//   }

  private _filter(value: string): Array<Hashes> {
    const filterValue = value.toLowerCase();
    return this.allElements.filter(element => element.name.toLowerCase().includes(filterValue));
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
