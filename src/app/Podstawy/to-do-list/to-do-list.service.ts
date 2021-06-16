import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tablicaToDo } from './to-do-list.component.stories';
import * as cuid from 'cuid';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  table$ = new BehaviorSubject<Array<tablicaToDo>>([]);
// { text: 'Uprzedzić babcię i dziadka o pogrzebie niespodziance na ich urodziny', textId: '111', state: false },
// { text: 'Wyrzucić śmieci', textId: '2222', state: true },
// { text: 'Podlać kwiatki', textId: '3333', state: false }

  constructor() {
    if (!!localStorage.ToDo) {
      this.table$.next(
        JSON.parse(localStorage.ToDo)
      );
      this.table$.subscribe(table => {
        console.log(111111111);
        localStorage.ToDo = JSON.stringify(table);
      });
    }
  }

  add(text: string) {
    const current = this.table$.value;
    this.table$.next(
      [
        ...current,
        {
          text,
          textId: cuid(),
          state: false
        }]);
  }

  remove(textId: string) {
    const current = this.table$.value;
    this.table$.next(
      [
        ...current.filter(record => record.textId !== textId)
      ]
    );
  }


  edit(textId: string) {
    return this.table$.value.find(record => record.textId === textId).text;
  }

  confirm(editText: string, editId: string) {
    const current = this.table$.value;
    this.table$.next(
      [
        ...current.map(({ text, textId, state }) => ({ textId, state, text: textId === editId ? editText : text }))
      ]
    );
  }

  changeState(checkId: string) {
    const current = this.table$.value;
    this.table$.next(
      [
        ...current.map(({ text, textId, state }) => ({ textId, text, state: textId === checkId ? !state : state }))
      ]
    );
  }

}
