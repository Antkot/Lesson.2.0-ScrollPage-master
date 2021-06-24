import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TableData } from './to-do-list.component.stories';
import * as cuid from 'cuid';
import { LocalStorageService } from './local-storage-service';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  table$ = new BehaviorSubject<TableData>({ tableId: '', toDo: [] });

  // tslint:disable-next-line:no-shadowed-variable
  constructor(private LocalStorageService: LocalStorageService) {

    if (!!localStorage.toDo) {
      console.table('tutaj: ', JSON.parse(this.LocalStorageService.getItem('toDo')));
      console.log('tutaj: ', this.LocalStorageService.getItem('toDo'));
      this.table$.value.toDo = (JSON.parse(this.LocalStorageService.getItem('toDo')));
    }
  }

  add(text: string) {
    const current = this.table$.value;
    this.table$.next(
      {
        tableId: current.tableId.length ? current.tableId : 'toDo',
        toDo: [
          ...current.toDo,
          {
            text,
            textId: cuid(),
            state: false
          }]
      });
    this.LocalStorageService.setItem(this.table$.value.tableId, JSON.stringify(this.table$.value.toDo));
    //this.table$.value.tableId ciągle się zmienia a wczoraj się nie zmieniało
    // this.LocalStorageService.setItem(this.table$.value.toDo[0].textId, JSON.stringify(this.table$.value.toDo[0]));
  }

  reRun(textId: string) {
    console.log('Tabela stara:', this.table$.value.tableId);
    console.log('Tabela nowa:', textId);
    const current = this.table$.value;
    current.tableId = textId;
    console.log(!!this.LocalStorageService.getItem(textId), 'STAN');
    if (!this.LocalStorageService.getItem(textId)) {
      this.LocalStorageService.setItem(this.table$.value.tableId, '');
      this.table$.value.toDo = null;
      2;
    } else {
      this.table$.value.toDo = (JSON.parse(this.LocalStorageService.getItem(textId)));
    }
  }

  remove(textId: string) {
    const current = this.table$.value;
    this.table$.next({
      tableId: current.tableId,
      toDo: [
        ...current.toDo.filter(record => record.textId !== textId)
      ]
    });
    this.LocalStorageService.removeItem(textId);
    this.LocalStorageService.
    setItem('toDo');
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
