import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
  Self
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgControl, Validators } from '@angular/forms';
import { distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { AbstractValueAccessor } from '../formControl';

@Component({
  selector: 'app-formule',
  templateUrl: './lists-formule.component.html',
  styleUrls: ['./lists-formule.component.scss']
})
export class ListsFormuleComponent extends AbstractValueAccessor implements OnInit {
  forms = this.fb.array([]);

  constructor(
    public elementRef: ElementRef,
    @Self()
    @Optional()
    public ngControl: NgControl,
    private fb: FormBuilder
  ) {
    super();
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  ngOnInit() {
    setTimeout(() => {
      const storageData = JSON.parse(localStorage.getItem('formule'));
      if (!!storageData) {
        storageData.forEach(
          ({ name, days }) => {
            this.forms.push(
              new FormGroup({ name: new FormControl(name), days: new FormControl(days) }));
          });
      }
    }, 2000);
    // this.subscribeWhileAlive(
    //   this.forms.valueChanges.pipe(
    //     tap((value) => {
    //       this.days = [...value.map(({ days }) => JSON.stringify(days))];
    //       localStorage.setItem('formule', JSON.stringify(value));
    //     })
    //   )
    // );
    this.subscribeWhileAlive(
      this.valueSubject.pipe(
        tap((currentValue) => {
        })
      ),
      this.forms.valueChanges.pipe(
        tap((currentValue) => {
          this.writeValue(currentValue);
        })
      ));
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

