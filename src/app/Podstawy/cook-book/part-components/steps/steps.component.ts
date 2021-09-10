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
  @Input() steps = [
    'Krok z braku inputu',
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
    console.log(this.steps);
  }

  ngOnInit(): void {
    this.heroForm = new FormGroup({
      name: new FormControl(this.newStep, [
        Validators.required,
        Validators.minLength(4)
      ])
    });
  }

  done(editedStep) {
    this.delete(this.edited);
    this.add(editedStep);
    const index = this.steps.indexOf(this.edited);
    const index2 = this.steps.indexOf(editedStep);
    console.log('indexy', index, index2);
    moveItemInArray(this.steps, this.steps.length, index);
    this.edited = null;
    this.editedStep = '';
  }

  refactor(step) {
    this.edited = step;
    this.editedStep = step;
    console.log('indexy', step);
  }

  delete(step) {
    const index = this.steps.indexOf(step);
    this.steps.splice(index, 1);
  }

  add(newStep) {
    if (newStep !== this.heroForm) {
      console.log(this.heroForm.get('name'));
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
