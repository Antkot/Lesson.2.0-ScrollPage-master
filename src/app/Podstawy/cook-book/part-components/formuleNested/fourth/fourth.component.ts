import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.scss']
})
export class FourthComponent extends AliveState implements OnInit {

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
        dish: new FormControl(
          `Danie ${this.forms.value.length + 1}`,
          [Validators.maxLength(14)]),
        hmm: new FormControl([])
      })
    );
  }
}

