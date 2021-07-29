import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/**
 * @title Chips Autocomplete
 */
@Component({
  selector: 'app-chips',
  templateUrl: 'chips.component.html',
  styleUrls: ['chips.component.scss']
})
export class ChipsComponent {
  selectable = true;
  @Input() removable = false;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  allergenCtrl = new FormControl();
  filteredAllergens: Observable<string[]>;
  allergens: string[] = ['Lactose'];
  allAllergens: string[] = ['Lactose', 'Peanuts', 'Sesame', 'Soybeans', 'Lupin'];

  @ViewChild('allergenInput') allergenInput: ElementRef<HTMLInputElement>;

  constructor() {
    this.filteredAllergens = this.allergenCtrl.valueChanges.pipe(
      startWith(null),
      map((allergen: string | null) => allergen ? this._filter(allergen) : this.allAllergens.slice()));
  }

  add(event: MatChipInputEvent): void {
    let value = (event.value || '').trim();
    value = titleCaseWord(value);
    // Add our allergen
    if (value) {
      if (!this.allergens.includes(value)) {
        this.allergens.push(value);
      }
      if (!this.allAllergens.includes(value)) {
        this.allAllergens.push(value);
      }
    }

    // Clear the input value
    event.input.value = '';

    this.allergenCtrl.setValue(null);
  }

  remove(allergen: string): void {
    const index = this.allergens.indexOf(allergen);

    if (index >= 0) {
      this.allergens.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const added = titleCaseWord(event.option.viewValue);
    if (!this.allergens.includes(added)) {
      this.allergens.push(added);
    }
    this.allergenInput.nativeElement.value = '';
    this.allergenCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allAllergens.filter(allergen => allergen.toLowerCase().includes(filterValue));
  }
}

function titleCaseWord(word: string) {
  if (!word) {
    return word;
  }
  return word[0].toUpperCase() + word.substr(1).toLowerCase();
}
