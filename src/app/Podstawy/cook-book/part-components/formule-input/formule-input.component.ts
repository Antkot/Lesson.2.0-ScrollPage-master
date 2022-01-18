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
  _name: string;
  @Input() set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  nameEdit = false;
  @Input() model = this.fb.group({
    lists: this.fb.array([])
  });

  constructor(
    private fb: FormBuilder
  ) {
    super();
  }

  get lists() {
    return this.model.controls[`lists`] as FormArray;
  }

  ngOnInit(): void {
    // this.subscribeWhileAlive(
    //   this.model.valueChanges.pipe(
    //     tap((name: { name: string }) => {
    //       }
    //     )));
    // this.model.controls[`name`].patchValue(this._name, { emitEvent: true });

  }

  // formReceiving(data: string) {
  //   this.data = parse(data);
  // }
  add() {
    const newDay = this.fb.group({
      day: 1, meals: [{ meal: 'meal 1', hour: '12', dishes: [] }]
    });
    this.lists.controls[`content.days`].push(newDay);
    //   this.model.controls[`name`].patchValue(this._name, { emitEvent: true });
    //   this.model.controls[`days`].patchValue([...this.model.controls[`days`].value, this.model.controls[`days`].value.length + 1], { emitEvent: true });
  }

  edit() {
    this.nameEdit = true;
  }

  save() {
    this.nameEdit = false;
    // this.model.controls[`content.name`].patchValue('Prosiaczek', { emitEvent: true });
  }
}
