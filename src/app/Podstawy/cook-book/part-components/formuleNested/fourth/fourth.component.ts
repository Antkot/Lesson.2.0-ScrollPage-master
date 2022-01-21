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

  @Output() dataSync = new EventEmitter();
  forms = this.fb.array([]);

  @Input() set dish(value: string) {
    console.log(11111, value);
      const model = JSON.parse(value);
    const _forms = [];
    Object.entries(model ).forEach(
      (x: {}) => {
        _forms.push({
          dish: x[1].dish,
        });
      });
    this.forms.setValue(_forms, {emitEvent: false});
  }


  constructor(private fb: FormBuilder) {
    super();
  }


  ngOnInit() {
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          this.dataSync.emit(JSON.stringify(value));
        })
      )
    );
  }

  addForm() {
    this.forms.push(
      new FormGroup({
        dish: new FormControl(`Danie ${this.forms.value.length + 1}`)
      })
    );
  }
}

