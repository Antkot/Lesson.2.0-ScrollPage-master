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
  _days: Array<{day: string, meals: Array<{ meal: string, hour: string, dishes: Array<{dish: string}> }>}> = [];
  set days(value: Array<{day: string, meals: Array<{ meal: string, hour: string, dishes: Array<{dish: string}> }>}>) {
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
          this.days = value.map(({ days }) => JSON.stringify(days));
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
        days: new FormControl([{
          day: 'dzień 1',
          meals: [{
            meal: 'Nowy',
            hour: '15:15',
            dishes: [{ dish: `Chleb 2` }],
          }]
        }])
      })
    );
  }

  returnData(returnedData: string, index: number) {
    this.forms.value.find(
      ({ name }) =>
        name === this.forms.value[index].name
    ).days = JSON.parse(returnedData);
  }
}

