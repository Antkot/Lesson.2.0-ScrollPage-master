import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-formule-input',
  templateUrl: './formule-input.component.html',
  styleUrls: ['./formule-input.component.scss']
})
export class FormuleInputComponent implements OnInit {
  _name: string;
days: Array<any> = [1, 2, 3];
  @Input() set name(name: string) {
    this._name = name;
  }

  get name() {
    return this._name;
  }

  control = new FormControl({
    name: ['', Validators.required]
  });

  constructor() {
  }

  ngOnInit(): void {
    this.control.patchValue(this._name);
  }
}
