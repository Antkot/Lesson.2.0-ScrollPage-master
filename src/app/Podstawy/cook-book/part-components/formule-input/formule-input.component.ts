import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../ActiveState';
import { parse } from 'path';

@Component({
  selector: 'app-formule-input',
  templateUrl: './formule-input.component.html',
  styleUrls: ['./formule-input.component.scss']
})
export class FormuleInputComponent extends AliveState
  implements OnInit {
  forms = this.fb.array([]);

  @Input() data: string;
  nameEdit = false;

  constructor(
    private fb: FormBuilder
  ) {
    super();
  }


  _text = '';
  set text(value: string) {
    this._text = value;
  }

  get text() {
    return this._text;
  }


  ngOnInit(): void {
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          console.log('data:', this.data);
          const x = JSON.parse(this.data);
          console.log('x: ', x);
          this.text = JSON.stringify(value);
        })
      )
    );
    // this.model.controls[`name`].patchValue(this._name, { emitEvent: true });
  }

  add() {
    this.forms.push(
      new FormGroup({
        day: new FormControl(
          `dzień  ${this.forms.value.length + 1}`,
          [Validators.maxLength(14)]),
        meals: new FormControl([])
      })
    );
  }
}
