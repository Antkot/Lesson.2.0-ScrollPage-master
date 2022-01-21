import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AliveState } from '../../../../ActiveState';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-formule',
  templateUrl: './formule.component.html',
  styleUrls: ['./formule.component.scss']
})
export class FormuleComponent extends AliveState implements OnInit {
  forms = this.fb.array([]);
  _days: Array<string> = [];
  set days(value: Array<string>) {
    this._days = value;
  }

  get days() {
    return this._days;
  }

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          this.days = [...value.map(({ days }) => JSON.stringify(days)) ];
        })
      )
    );
  }

  addForm() {
    this.forms.push(
      new FormGroup({
        name: new FormControl(
          `formularz ${this.forms.value.length + 1}`),
        days: new FormControl([])
      })
    );
  }

  dataBackup(returnedData: string, index: number) {
    const model = [];
    Object.entries({ ...this.forms.value }).forEach(
      (x: {}) => {
        model.push({
          name: x[1].name,
          days: Number(x[0]) === index ? JSON.parse(returnedData) : x[1].days
        });
      });
    this.forms.setValue(model);
  }
}

