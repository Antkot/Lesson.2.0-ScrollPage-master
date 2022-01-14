import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { AliveState } from '../../../../ActiveState';
import { tap } from 'rxjs/operators';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.scss']
})
export class FormuleComponent extends AliveState implements OnInit {
  model = this.fb.group({
    lists: [['Lista 1', 'Lista 2']],
    something: this.fb.array([])
  });
  constructor(private fb: FormBuilder) {
    super();
  }
  get something() {
    return this.model.controls[`something`] as FormArray;
    // something początkowo jest puste, ale jest eydtowalną tablicą, bez ograniczeń długości
    // możemy dodać iole chcemy form controli
    //
  }
  get lists() {
    return this.model.controls[`lists`].value as Array<string>;
  }

  ngOnInit(): void {
    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        tap((name: { name: string }) => {
            // this.lists = this.model.value.lists;
          }
        )));
  }

  add() {
    this.model.controls[`lists`].patchValue([...this.model.controls[`lists`].value,
      `lista ${ this.model.controls[`lists`].value.length + 1 }`], { emitEvent: true });
  }

addControl() {
    const newForm = this.fb.group({
      name: ['newList', Validators.required],
      noContent: ['string for now', Validators.required]
    });
    this.something.push(newForm);
}
delete(index: number) {
    this.something.removeAt(index);
  }


}
