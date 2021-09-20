import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { DishType, Hash, Level } from '../../types';
import { TagsStorageService } from '../services/tags-storage.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { AllergensStorageService } from '../services/allergens-storage.service';

@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrls: ['./side-filter.component.scss']
})
export class SideFilterComponent implements OnInit {
  dishes$: Observable<Array<DishType>> = this.loadingService.dishes$;
  tags$: Observable<Array<Hash>> = this.tagsService.tags$;
  allergens$: Observable<Array<Hash>> = this.allergensService.allergens$;
  levels$: Observable<Array<Level>> = this.loadingService.levels$;
  tag: string = null;
  allElements: Array<Hash>;
  // final: Array<Hashes>;
  timeLimit = '';
  @Output() addedAllergen = new EventEmitter();
  @Output() addedTag = new EventEmitter();
  @Output() removedAllergen = new EventEmitter();
  @Output() removedTag = new EventEmitter();
  @Input() allFilterOptions;
  // @Output() timeLimitOut = new EventEmitter();
  // addNewItem(value: string) {
  //   this.timeLimitOut.emit(value);
  // }
  counter(i: number) {
    return new Array(i);
  }

  constructor(
    private loadingService: LoadingService,
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
  }
  addTag(event: MatChipInputEvent) {
    this.addedTag.emit(event);
  }

  removeAllergen(event: MatChipInputEvent) {
    this.removedAllergen.emit(event);
  }

  removeTag(event: MatChipInputEvent) {
    this.removedTag.emit(event);
  }
}


