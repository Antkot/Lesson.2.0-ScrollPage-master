import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-steps',
  templateUrl: './steps.component.html',
  styleUrls: ['./steps.component.scss']
})
export class StepsComponent implements OnInit {
  @Input() edit = false;
  edited = null;
  steps = [
    'Obierz cebulę i pokrój na drobne kawałeczki',
    'Piecz na wolnym ogniu, powoli dolewając mleka',
    'Ugotój pół kilo makaronu',
    'Ugotowany makaron dosyp do cebuli',
    'Wbij jaja do całości, dopraw wegług smaku'
  ];

  drop(event: CdkDragDrop<Array<string>>) {
    moveItemInArray(this.steps, event.previousIndex, event.currentIndex);
  }

  constructor() {
  }

  ngOnInit(): void {
  }

  done() {
    this.edited = null;
  }

  stepp(step) {

  }
}
