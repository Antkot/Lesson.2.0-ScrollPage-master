import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  model = this.fb.group({
    step: ['', [Validators.required, Validators.minLength(1)]]
  });
  @Input() edit = false;
  edited: number = null;
  @Input() steps = [
    'Krok z braku inputu',
    'Obierz cebulę i pokrój na drobne kawałeczki',
    'Piecz na wolnym ogniu, powoli dolewając mleka',
    'Ugotuj pół kilo makaronu',
    'Ugotowany makaron dosyp do cebuli',
    'Wbij jaja do całości, dopraw wegług smaku'
  ];
  @Output() newStep = new EventEmitter();
  @Output() deletedStep = new EventEmitter();
  @Output() editStep = new EventEmitter();
  @Output() reindexStep = new EventEmitter();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  drop(event: CdkDragDrop<Array<string>>) {
    this.reindexStep.emit({previousIndex: event.previousIndex, currentIndex: event.currentIndex });
  }

  done() {
    this.editStep.emit({ step: this.model.value.step, index: this.edited });
    this.edited = null;
    this.model.reset();
  }

  refactor(index: number) {
    this.edited = index;
    this.model.setValue({ step: this.steps[index] });
  }

  delete(index: number) {
    this.deletedStep.emit(index);
  }

  add() {
    this.newStep.emit(this.model.value.step);
    this.model.reset();
  }

}
