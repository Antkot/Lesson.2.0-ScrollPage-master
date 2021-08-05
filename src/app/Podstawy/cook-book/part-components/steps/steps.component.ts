import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  @Input() edit = false;
  edited = null;
  private newStep: string;
  private editedStep: string;
  steps = [
    'Obierz cebulę i pokrój na drobne kawałeczki',
    'Piecz na wolnym ogniu, powoli dolewając mleka',
    'Ugotuj pół kilo makaronu',
    'Ugotowany makaron dosyp do cebuli',
    'Wbij jaja do całości, dopraw wegług smaku'
  ];
  private heroForm: FormGroup;

  constructor() {
  }

  drop(event: CdkDragDrop<Array<string>>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
  }

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: new FormControl(this.newStep, [
        Validators.required,
        Validators.minLength(4),
      ]),
    });
  }

  done(editedStep) {
    if (this.steps.includes(editedStep)) {
      //wykrywa samo siebie ! ! !
      editedStep = editedStep + ' ';
    }
    const index = this.steps.indexOf(this.edited);
    this.steps[index] = editedStep;
    this.edited = null;
    this.editedStep = '';
  }

  refactor(step) {
    this.edited = step;
    this.editedStep = step;
  }

  delete(step) {
    const index = this.steps.indexOf(step);
    this.steps.splice(index, 1);
  }

  add(newStep) {
    if (newStep !== '') {
      newStep = this.duplicateCheck(newStep);
      this.steps.push(newStep);
      this.newStep = '';
    }
  }

  duplicateCheck(step) {
    if (this.steps.includes(step)) {
      step = step + ' ';
      step = this.duplicateCheck(step);
    }
    return step;
  }

}
