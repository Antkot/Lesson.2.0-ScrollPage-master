import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { AliveState } from '../../../../ActiveState';

@Component({
  selector: 'app-formule-input',
  templateUrl: './formule-input.component.html',
  styleUrls: ['./formule-input.component.scss']
})
export class FormuleInputComponent extends AliveState
  implements OnInit {
  _name: string;
  @Input() set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }
  nameEdit = false;
  model = this.fb.group({
    name: ['no_name', [Validators.required]],
    days: [[1, 2, 3], [Validators.required]]
  });
  tag = this.model.value.name;
  days = this.model.value.days;

  constructor(
    private fb: FormBuilder,
    // private  fa: FormArray
  ) {
    super();
  }

  ngOnInit(): void {
    this.subscribeWhileAlive(
      this.model.valueChanges.pipe(
        tap((name: { name: string }) => {
            this.tag = this.model.value.name;
            this.days = this.model.value.days;

          }
        )));
    this.model.controls[`name`].patchValue(this._name, { emitEvent: true });

  }

  add() {
    this.model.controls[`name`].patchValue(this._name, { emitEvent: true });
    this.model.controls[`days`].patchValue([...this.model.controls[`days`].value, this.model.controls[`days`].value.length + 1], { emitEvent: true });
  }
  edit() {
    this.nameEdit = true;
  }
  save() {
    this.nameEdit = false;
    this.model.controls[`name`].patchValue('Prosiaczek', { emitEvent: true });
  }
}
