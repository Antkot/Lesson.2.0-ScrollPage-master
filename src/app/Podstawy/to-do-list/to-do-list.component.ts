import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tableData } from './to-do-list.component.stories';
import { Observable } from 'rxjs';
import { ToDoListService } from './to-do-list.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.scss']
})
export class ToDoListComponent implements OnInit {
  table$: Observable<tableData> = this.service.table$;
  form = this.fb.group({ text: ['', [Validators.minLength(5), Validators.required]] });
  editable = false;
  textId = '';

  constructor(private fb: FormBuilder, private service: ToDoListService) {
  }

  ngOnInit(): void {
  }


  add() {
    this.service.add(this.form.get(['text']).value);
    this.form.reset();
  }

  remove(textId: string) {
    this.service.remove(textId);
  }

//
  edit(textId: string) {
    this.form.patchValue({ text: this.service.edit(textId) });
    this.editable = true;
    this.textId = textId;
  }

  confirm() {
    this.service.confirm(this.form.get(['text']).value, this.textId);
    this.editable = false;
    this.form.reset();
  }

  changeState(textId: string) {
    this.service.changeState(textId);
  }
}
