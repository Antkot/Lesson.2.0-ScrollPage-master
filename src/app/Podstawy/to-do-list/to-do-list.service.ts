import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableData } from './to-do-list.component.stories';
import * as cuid from 'cuid';
import { LocalStorageService } from './local-storage-service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {
  table$ = new BehaviorSubject<TableData>({ tableId: '', parentId: '', toDo: [] });
  lastParentId = '';
  backed = false;

  constructor(private localStorageService: LocalStorageService) {
    // if (!!localStorage.toDo) {
    //   const current = JSON.parse(this.localStorageService.getItem('toDo'));
    //   this.table$.next(
    //     {
    //       tableId: current.tableId,
    //       parentId: current.parentId,
    //       toDo: [
    //         ...current.toDo
    //       ]
    //     });
    // }
  }
  setId(id: string) {
    console.log(111111111111, id);
    this.table$.value.tableId = id;
 // return this.table$.pipe(map((value) => value.))
  }
  add(text: string) {
    const current = this.table$.value;
    this.table$.next(
      {
        tableId: current.tableId,
        parentId: current.parentId,
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
    this.lastParentId = this.table$.value.tableId;
    if (!!this.localStorageService.getItem(textId)) {
      const current = JSON.parse(this.localStorageService.getItem(textId));
      if (this.backed) {
        this.lastParentId = current.parentId;
        this.backed = false;
      }
      this.table$.next(
        {
          tableId: textId,
          parentId: this.lastParentId,
          toDo: [
            ...current.toDo
          ]
        });
    } else {
      this.table$.next(
        {
          tableId: textId,
          parentId: this.table$.value.tableId,
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


  back() {
    this.backed = true;
    this.reRun(this.lastParentId);

    // this.lastParentId = this.table$.value.parentId;
  }
}
