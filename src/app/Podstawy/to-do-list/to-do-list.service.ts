import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tableData, tablicaToDo } from './to-do-list.component.stories';
import * as cuid from 'cuid';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  table$ = new BehaviorSubject<tableData>({ tableId: '', toDo: [] });

  constructor() {
    // if (!!localStorage.toDo) {
    //   this.table$.next(
    //     JSON.parse(localStorage.toDo)
    //   );
    //   this.table$.subscribe(table => {
    //     console.log('zmodyfikowano ciasteczko');
    //     localStorage.toDo = JSON.stringify(table);
    //   });
    // }
  }

  add(text: string) {
    const current = this.table$.value;
    this.table$.next(
      {
        tableId: current.tableId,
        toDo: [
          ...current.toDo,
          {
            text,
            textId: cuid(),
            state: false
          }]
      });
  }

  remove(textId: string) {
    const current = this.table$.value;
    this.table$.next({
      tableId: current.tableId,
      toDo: [
        ...current.toDo.filter(record => record.textId !== textId)
      ]
    });
  }


  edit(textId: string) {
    return this.table$.value.toDo.find(record => record.textId === textId).text;
  }

  confirm(editText: string, editId: string) {
    const current = this.table$.value;
    this.table$.next({
      tableId: current.tableId,
      toDo: [
        ...current.toDo.map(({ text, textId, state }) => ({ textId, state, text: textId === editId ? editText : text }))
      ]
    });
  }

  changeState(checkId: string) {
    const current = this.table$.value;
    this.table$.next({
      tableId: current.tableId,
      toDo: [
        ...current.toDo.map(({ text, textId, state }) => ({ textId, text, state: textId === checkId ? !state : state }))
      ]
    });
  }

}
