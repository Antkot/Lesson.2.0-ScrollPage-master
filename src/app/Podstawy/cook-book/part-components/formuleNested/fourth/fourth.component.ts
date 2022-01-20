import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../../ActiveState';

@Component({
  selector: 'app-fourth',
  templateUrl: './fourth.component.html',
  styleUrls: ['./fourth.component.scss']
})
export class FourthComponent extends AliveState implements OnInit {

  @Output() returnData = new EventEmitter();

  @Input() set dish(value: string) {
    const model = JSON.parse(value);
    model.forEach(({ dish }) => {
      this.forms.push(
        new FormGroup({
          name: new FormControl(dish)
        })
      );
    });
  }

  _dishes: Array<{dish: string}> = [];
  set dishes(value: Array<{dish: string}>) {
    this._dishes = value;
  }

  forms = this.fb.array([]);

  constructor(private fb: FormBuilder) {
    super();
  }


  ngOnInit() {
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          this.returnData.emit(JSON.stringify(value));
        })
      )
    );
  }

  addForm() {
    this.forms.push(
      new FormGroup({
        dish: new FormControl(
          `Danie ${this.forms.value.length + 1}`,
          [Validators.maxLength(14)])
      })
    );
  }
}

