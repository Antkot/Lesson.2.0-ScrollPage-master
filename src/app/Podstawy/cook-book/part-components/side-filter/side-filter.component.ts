import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { Dish, Levels } from '../../types';
import { ChipService } from '../services/chip.service';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  dishes$: Observable<Array<Dish>> = this.loadingService.dishes$;
  levels$: Observable<Array<Levels>> = this.loadingService.levels$;
  tag: string = null;
  allElements: Array<Dish>;
  final: Array<string>;
  timeLimit = '';
  addedAllergen = 'x';
  removedAllergen = '';
  // @Output() timeLimitOut = new EventEmitter();
  // addNewItem(value: string) {
  //   this.timeLimitOut.emit(value);
  // }
  counter(i: number) {
    return new Array(i);
  }

  constructor(private loadingService: LoadingService, private chipService: ChipService) {
    this.dishes$.subscribe(data => this.allElements = data);
    this.final = this.allElements.map(({ name }) => name);
    console.table(this.final);
  }

  ngOnInit(): void {
  }

  timeLimiting($event) {
    this.timeLimit = $event;
  }

  addAllergen($event) {
    this.addedAllergen = $event;
    console.log(1, this.addedAllergen);
  }

  removeAllergen($event) {
    this.removedAllergen = $event;
    console.log(2, this.removedAllergen);
  }


  addTag(x: string) {
    this.tag = this.chipService.addTag(x);
    console.log((this.tag));
  }

}


