import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AliveState } from '../../../../ActiveState';
import { tap } from 'rxjs/operators';
import { emit } from 'cluster';
import { stringify } from 'querystring';
import { parse } from 'path';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.scss']
})
export class FormuleComponent extends AliveState implements OnInit {
  forms = this.fb.array([]);

  constructor(private fb: FormBuilder) {
    super();
  }

  _text = '';
  set text(value: string) {
    this._text = value;
  }

  get text() {
    return this._text;
  }

  ngOnInit() {
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          this.text = JSON.stringify(value);
        })
      )
    );
  }

  addForm() {
    this.forms.push(
      new FormGroup({
        name: new FormControl(
          `formularz ${this.forms.value.length + 1}`,
          [Validators.maxLength(14)]),
        days: new FormControl([])
      })
    );
  }
}

