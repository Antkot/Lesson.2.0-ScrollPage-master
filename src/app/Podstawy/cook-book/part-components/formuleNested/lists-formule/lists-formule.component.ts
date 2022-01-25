import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AliveState } from '../../../../../ActiveState';
import { tap } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-formule',
  templateUrl: './lists-formule.component.html',
  styleUrls: ['./lists-formule.component.scss']
})
export class ListsFormuleComponent extends AliveState implements OnInit {
  forms = this.fb.array([]);
  _days: Array<string> = [];
  set days(value: Array<string>) {
    this._days = value;
  }

  get days() {
    return this._days;
  }

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {
    setTimeout(() => {
      const storageData = JSON.parse(localStorage.getItem('formule'));
      if (!!storageData) {
        this.days = storageData.map(({ days }) => JSON.stringify(days));
        storageData.forEach(
          ({ name, days }) => {
            this.forms.push(
              new FormGroup({ name: new FormControl(name), days: new FormControl(days) }));
          });
      }
    }, 2000);
    this.subscribeWhileAlive(
      this.forms.valueChanges.pipe(
        tap((value) => {
          this.days = [...value.map(({ days }) => JSON.stringify(days))];
          localStorage.setItem('formule', JSON.stringify(value));
        })
      )
    );
  }

  addForm() {
    this.forms.push(
      new FormGroup({
        name: new FormControl(
          `formularz ${this.forms.value.length + 1}`),
        days: new FormControl([])
      })
    );
  }

  dataBackup(returnedData: string, index: number, eventEmitter: boolean) {
    const model = [];
    Object.entries({ ...this.forms.value }).forEach(
      (x: {}) => {
        model.push({
          name: x[1].name,
          days: Number(x[0]) === index ? JSON.parse(returnedData) : x[1].days
        });
      });
    this.forms.setValue(model, { emitEvent: eventEmitter });
  }

  remove(index) {
    this.forms.removeAt(index);
  }
  drop(event: CdkDragDrop<FormGroup[]>) {
    const dir = event.currentIndex > event.previousIndex ? 1 : -1;

    const from = event.previousIndex;
    const to = event.currentIndex;

    const temp = this.forms.at(from);
    for (let i = from; i * dir < to * dir; i = i + dir) {
      const current = this.forms.at(i + dir);
      this.forms.setControl(i, current);
    }
    this.forms.setControl(to, temp);
  }
}
