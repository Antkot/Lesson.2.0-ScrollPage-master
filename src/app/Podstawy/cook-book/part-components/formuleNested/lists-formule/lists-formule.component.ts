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
import { LocalStorageService } from '../../services/local-storage-service';
import { validate } from 'codelyzer/walkerFactory/walkerFn';

@Component({
  selector: 'app-formule',
  templateUrl: './lists-formule.component.html',
  styleUrls: ['./lists-formule.component.scss']
})
export class ListsFormuleComponent extends AbstractValueAccessor implements OnInit {
  forms = this.fb.array([]);

  constructor(
    private localStorageService: LocalStorageService,
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
    let loaded = false;
    const storageData = JSON.parse(localStorage.getItem('formule'));
    if (!!storageData) {
      storageData.forEach(
        ({ name, days }) => {
          this.forms.push(
            new FormGroup({ name: new FormControl(name, { validators: [Validators.minLength(3)] }), days: new FormControl(days) }));
        });
    }
    loaded = true;
    this.subscribeWhileAlive(
      this.valueSubject.pipe(
        tap((currentValue) => {
          if (loaded === true) {
            this.localStorageService.setItem('formule', JSON.stringify(this.forms.value));
          }
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
          `formularz ${this.forms.value.length + 1}`, { validators: [Validators.minLength(3)] }),
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

// @Component({
//   selector: 'input-error-state-matcher-example',
//   templateUrl: './input-error-state-matcher-example.html',
//   styleUrls: ['./input-error-state-matcher-example.css'],
// })
// export class InputErrorStateMatcherExample {
//   emailFormControl = new FormControl('', [Validators.required, Validators.email]);
//
//   matcher = new MyErrorStateMatcher();
// }
