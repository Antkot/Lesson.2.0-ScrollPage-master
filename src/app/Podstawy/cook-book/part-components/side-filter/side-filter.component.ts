import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { Dish, Hashes, Levels } from '../../types';
import { ChipService } from '../services/chip.service';
import { TagsStorageService } from '../services/tags-storage.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { AllergensStorageService } from '../services/allergens-storage.service';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  dishes$: Observable<Array<Dish>> = this.loadingService.dishes$;
  tags$: Observable<Array<Hashes>> = this.tagsService.tags$;
  allergens$: Observable<Array<Hashes>> = this.allergensService.allergens$;
  levels$: Observable<Array<Levels>> = this.loadingService.levels$;
  tag: string = null;
  allElements: Array<Hashes>;
  // final: Array<Hashes>;
  timeLimit = '';
  @Output() addedAllergen = new EventEmitter();
  @Output() addedTag = new EventEmitter();
  @Output() removedAllergen = new EventEmitter();
  @Output() removedTag = new EventEmitter();

  // @Output() timeLimitOut = new EventEmitter();
  // addNewItem(value: string) {
  //   this.timeLimitOut.emit(value);
  // }
  counter(i: number) {
    return new Array(i);
  }

  constructor(
    private loadingService: LoadingService,
    private chipService: ChipService,
    private  tagsService: TagsStorageService,
    private  allergensService: AllergensStorageService
  ) {
    this.tags$.subscribe(data => this.allElements = data);
    // this.final = this.allElements.map(({ name }) => name);
    // console.table(this.final);
  }


  ngOnInit(): void {
  }

  timeLimiting($event) {
    this.timeLimit = $event;
  }

  addAllergen(event: MatChipInputEvent) {
    this.addedAllergen.emit(event);
    console.log(event);
  }
  addTag(event: MatChipInputEvent) {
    this.addedTag.emit(event);
    console.log(event);
  }

  removeAllergen(event: MatChipInputEvent) {
    this.removedAllergen.emit(event);
  }

  removeTag(event: MatChipInputEvent) {
    this.removedTag.emit(event);
  }
}


