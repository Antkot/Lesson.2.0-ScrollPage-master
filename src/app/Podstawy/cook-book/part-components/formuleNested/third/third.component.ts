import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';

@Component({
  selector: 'app-third',
  templateUrl: './third.component.html',
  styleUrls: ['./third.component.scss']
})
export class ThirdComponent extends AliveState implements OnInit {

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
        meal: new FormControl(
          `posiłek ${this.forms.value.length + 1}`,
          [Validators.maxLength(14)]),
        hour: new FormControl(
          `12:00`),
        dishes: new FormControl([])
      })
    );
  }
}
