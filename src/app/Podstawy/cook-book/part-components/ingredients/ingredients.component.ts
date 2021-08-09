import { Component, Input, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable, ReplaySubject } from 'rxjs';

export interface PeriodicElement {
  position: number;
  name: string;
  weight: number;
  measure: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Woda', weight: 2, measure: 'l' },
  { position: 2, name: 'Drożdże', weight: 200, measure: 'g' },
  { position: 3, name: 'Olej', weight: 50, measure: 'ml' },
  { position: 4, name: 'Mąka', weight: 0.5, measure: 'kg' },
  { position: 5, name: 'Cukier', weight: 0.75, measure: 'szklanki' },
  { position: 6, name: 'Jaja', weight: 5, measure: 'szt.' },
];


@Component({
  selector: 'app-ingredients',
  templateUrl: './ingredients.component.html',
  styleUrls: ['./ingredients.component.scss']
})
export class IngredientsComponent implements OnInit{
@Input() edit;
displayedColumns: string[] = [
    'position',
    'name',
    'weight',
    'measure'
  ];
  dataToDisplay = [...ELEMENT_DATA];

  dataSource = new ExampleDataSource(this.dataToDisplay);

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataToDisplay = [
      ...this.dataToDisplay,
      ELEMENT_DATA[randomElementIndex]
    ];
    this.dataSource.setData(this.dataToDisplay);
  }

  removeData() {
    this.dataToDisplay = this.dataToDisplay.slice(0, -1);
    this.dataSource.setData(this.dataToDisplay);
  }

  ngOnInit(): void {
  }
}

class ExampleDataSource extends DataSource<PeriodicElement> {
  private _dataStream = new ReplaySubject<PeriodicElement[]>();

  constructor(initialData: PeriodicElement[]) {
    super();
    this.setData(initialData);
  }

  connect(): Observable<PeriodicElement[]> {
    return this._dataStream;
  }

  disconnect() {
  }

  setData(data: PeriodicElement[]) {
    this._dataStream.next(data);
  }
}
