import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableData } from './to-do-list.component.stories';
import * as cuid from 'cuid';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  lastParent = 'toDo';
  table$ = new BehaviorSubject<TableData>({ tableId: '', parentId: '', toDo: [] });

  constructor(private localStorageService: LocalStorageService) {
    this.table$.value.tableId = 'toDo';
    if (!!localStorage.toDo) {
      const current = JSON.parse(this.localStorageService.getItem('toDo'));
      this.table$.next(
        {
          tableId: current.tableId,
          parentId: current.parentId,
          toDo: [
            ...current.toDo
          ]
        });
    }
  }

  add(text: string) {
    const current = this.table$.value;
    console.log('parent:', this.lastParent);
    //^to siem zepsulo
    this.table$.next(
      {
        tableId: current.tableId,
        parentId: this.lastParent,
        toDo: [
          ...current.toDo,
          {
            text,
            textId: cuid(),
            state: false
          }]
      });
    this.localStorageService.setItem(this.table$.value.tableId, JSON.stringify(this.table$.value));
  }

  reRun(textId: string) {
    this.lastParent = this.table$.value.parentId;
    if (textId === 'back') {
      textId = this.table$.value.parentId;
      console.log(textId);
    }
    if (!!this.localStorageService.getItem(textId)) {
      const current = JSON.parse(this.localStorageService.getItem(textId));
      this.table$.next(
        {
          tableId: textId,
          parentId: this.table$.value.tableId,
          toDo: [
            ...current.toDo
          ]
        });
    } else {
      this.table$.next(
        {
          tableId: textId,
          parentId: this.table$.value.parentId,
          toDo: []
        });
    }
  }

  remove(textId: string) {
    const current = this.table$.value;
    this.table$.next({
      tableId: current.tableId,
      parentId: current.parentId,
      toDo: [
        ...current.toDo.filter(record => record.textId !== textId)
      ]
    });
    this.localStorageService.removeItem(textId);
    this.localStorageService.setItem(this.table$.value.tableId, JSON.stringify(this.table$.value));
  }

  edit(textId: string) {
    return this.table$.value.toDo.find(record => record.textId === textId).text;
  }

  confirm(editText: string, editId: string) {
    const current = this.table$.value;
    this.table$.next({
      tableId: current.tableId,
      parentId: current.parentId,
      toDo: [
        ...current.toDo.map(({ text, textId, state }) => ({ textId, state, text: textId === editId ? editText : text }))
      ]
    });
    this.localStorageService.setItem(this.table$.value.tableId, JSON.stringify(this.table$.value));
  }

  changeState(checkId: string) {
    const current = this.table$.value;
    this.table$.next({
      tableId: current.tableId,
      parentId: current.parentId,
      toDo: [
        ...current.toDo.map(({ text, textId, state }) => ({ textId, text, state: textId === checkId ? !state : state }))
      ]
    });
    this.localStorageService.setItem(this.table$.value.tableId, JSON.stringify(this.table$.value));
  }

}
