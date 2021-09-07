import { Component, OnInit, Output } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { Dish, Hashes, Levels } from '../../types';
import { ChipService } from '../services/chip.service';
import { TagsStorageService } from '../services/tags-storage.service';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  dishes$: Observable<Array<Dish>> = this.loadingService.dishes$;
  tags$: Observable<Array<Hashes>> = this.tagsService.tags$;
  levels$: Observable<Array<Levels>> = this.loadingService.levels$;
  tag: string = null;
  allElements: Array<Hashes>;
  // final: Array<Hashes>;
  timeLimit = '';
  @Output() addedAllergen;
  @Output() addedTag;
  @Output() removedAllergen;
  @Output() removedTag;
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
    private  tagsService: TagsStorageService) {
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
    this.addedAllergen = event;
    this.addedAllergen.emit(event.value);
  }
  addTag(event: MatChipInputEvent) {
    this.addedTag = event;
    this.addedTag.emit(event.value);
  }

  removeAllergen(event: MatChipInputEvent) {
    this.removedAllergen = event;
    console.log(2, event);
    this.addedTag.emit(event.value);
  }

  removeTag(event: MatChipInputEvent) {
    this.removedTag = event;
    this.addedTag.emit(event.value);
  }
}


