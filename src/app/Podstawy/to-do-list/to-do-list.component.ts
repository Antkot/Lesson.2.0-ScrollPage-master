import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tablicaToDo } from './to-do-list.component.stories';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  table: Array<tablicaToDo> = [];
  form = this.fb.group({ text: ['', [Validators.minLength(5), Validators.required]] });
  editable = false;
  id: number = null;

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  add() {
    this.table.push({ text: this.form.get(['text']).value, lenght: this.form.get(['text']).value.length, state: false });
    console.log('something', this.form.value);
    console.log('something', this.table);
    this.form.reset();
  }

  remove(i: number) {
    this.table.splice(i, 1);
  }

  edit(i: number) {
    this.form.patchValue({ text: this.table.find(((value, index) => index === i)).text });
    this.editable = true;
    this.id = i;
  }

  confirm() {
    if (this.id || this.id === 0) {
      this.table.find(((value, index) => index === this.id)).text = this.form.get(['text']).value;
      this.table.find(((value, index) => index === this.id)).lenght = this.form.get(['text']).value.lenght;
      // this.table.find(((value, index) => index === this.id)) = {
      //   text: this.form.get(['text']).value,
      //   lenght: this.form.get(['text']).value.lenght
      // };
      this.editable = false;
      this.form.reset();
    }
  }

  changeState(i: number) {
    this.table.find(((value, index) => index === i)).state
      = !this.table.find(((value, index) => index === i)).state;
    console.table(this.table)
  }
}
