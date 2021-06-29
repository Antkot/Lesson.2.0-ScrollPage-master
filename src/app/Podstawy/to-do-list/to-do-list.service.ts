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

  constructor(private localStorageService: LocalStorageService) {
    this.table$.value.tableId = 'toDo';
    if (!!localStorage.toDo) {
      console.table('tutaj: ', JSON.parse(this.localStorageService.getItem('toDo')));
      console.log('tutaj: ', this.localStorageService.getItem('toDo'));
      // this.table$.value.toDo = (JSON.parse(this.localStorageService.getItem('toDo')));
      const current = JSON.parse(this.localStorageService.getItem('toDo'));
      this.table$.next(
        {
          tableId: current.tableId,
          toDo: [
            ...current.toDo
          ]
        });
      // this.table$.value.tableId = (JSON.parse(this.LocalStorageService.getItem('toDo')).value.tableId);
    }
  }

  add(text: string) {
    const current = this.table$.value;
    console.log('dodajemy do tablicy', current.tableId);
    this.table$.next(
      {
        // tableId: current.tableId.length ? current.tableId : 'toDo',
        tableId: current.tableId,
        toDo: [
          ...current.toDo,
          {
            text,
            textId: cuid(),
            state: false
          }]
      });
    this.localStorageService.setItem(this.table$.value.tableId, JSON.stringify(this.table$.value));
    // this.LocalStorageService.setItem(this.table$.value.toDo[0].textId, JSON.stringify(this.table$.value.toDo[0]));
  }

  reRun(textId: string) {
    // this.lastParentId = this.table$.value.tableId;
    console.log('Tabela stara:', this.table$.value.tableId);
    console.log('Tabela nowa:', textId);
    // const current = this.table$.value;
    // current.tableId = textId;
    // this.table$.value.tableId = textId;
    // console.log('istnieje', !!this.localStorageService.getItem(textId));
    if (!!this.localStorageService.getItem(textId)) {
      console.log('wczytujemy cookie');
      const current = JSON.parse(this.localStorageService.getItem(textId));
      this.table$.next(
        {
          tableId: textId,
          toDo: [
            ...current.toDo
          ]
        });
    } else {
      this.table$.next(
        {
          tableId: textId,
          toDo: [
          ]
        });
    }
    // console.log('Last parent ID:', this.lastParentId);
    //Fragment z ifem tworzącym cookie lub wczytującym
    //    if (!this.localStorageService.getItem(textId)) {
    //      console.log('tworzymy cookie', 'bo nie istnieje cookie o kluczu: ', textId);
    //      this.localStorageService.setItem(this.table$.value.tableId, '');
    //      this.table$.value.toDo = null;
    //    } else {
    //      console.log('wczytujemy cookie');
    //      // this.table$.value.toDo = (JSON.parse(this.localStorageService.getItem(textId)));
    //      const currentLoad = JSON.parse(this.localStorageService.getItem('toDo'));
    //      this.table$.next(
    //        {
    //          tableId: currentLoad.tableId,
    //          toDo: [
    //            ...currentLoad.toDo
    //          ]
    //        });
    //    }
  }

  remove(textId: string) {
    const current = this.table$.value;
    this.table$.next({
      tableId: current.tableId,
      toDo: [
        ...current.toDo.filter(record => record.textId !== textId)
      ]
    });
    this.localStorageService.removeItem(textId);
    this.localStorageService.setItem('toDo', JSON.stringify(this.table$.value.toDo));
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
