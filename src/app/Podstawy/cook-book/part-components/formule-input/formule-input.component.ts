import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formule-input',
  templateUrl: './formule-input.component.html',
  styleUrls: ['./formule-input.component.scss']
})
export class FormuleInputComponent implements OnInit {
  _name: string;
  @Input() set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  control = new FormControl({
    name: ['', Validators.required],
    days: [1, 2, 3]
  });
  days = this.control.value.days;

  constructor() {
  }

  ngOnInit(): void {
    this.control.patchValue(this._name);
  }

  add() {
    // this.control[`days`].setValue(1, 2, 3, 5);
    this.control[`name`].patchValue('xd');
  }
}
