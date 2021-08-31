import { Component, Input, OnInit, Output } from '@angular/core';
import { LoadingService } from '../services/loading.service';
import { Observable } from 'rxjs';
import { Dish, Hashes, Levels } from '../../types';
import { ChipService } from '../services/chip.service';
import { TagsStorageService } from '../services/tags-storage.service';
import { MatChipInputEvent } from '@angular/material/chips';
import { EventEmitter } from '@angular/core';

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
  final: Array<string>;
  timeLimit = '';
  @Output() addedAllergen = new EventEmitter();
  @Output() addedTag = new EventEmitter();
  @Output() removedAllergen = new EventEmitter();
  @Output() removedTag = new EventEmitter();
  // @Output() timeLimitOut = new EventEmitter();
  // TODO 1 tag, 2 allergen, compare with observables;
  // @Input() 1entity: string;
  // @Input() 1removable = false;
  // @Input() 1chipColor = 'none';
  // @Input() 1elements: Array<string> = ['no-input-data'];
  // @Input() 1allElements: Array<string> = ['still-no-input-data'];
  // @Input() 2entity: string;
  // @Input() 2removable = false;
  // @Input() 2chipColor = 'none';
  // @Input() 2elements: Array<string> = ['no-input-data'];
  // @Input() 2allElements: Array<string> = ['still-no-input-data'];

  counter(i: number) {
    return new Array(i);
  }

  constructor(
    private loadingService: LoadingService,
    private chipService: ChipService,
    private  tagsService: TagsStorageService) {
    this.tags$.subscribe(data => this.allElements = data);
    this.final = this.allElements.map(({ name }) => name);
  }


  ngOnInit(): void {
  }
  // addNewItem(value: string) {
  //   this.timeLimitOut.emit(value);
  // }

  timeLimiting($event) {
    this.timeLimit = $event;
  }

  addAllergen(event: MatChipInputEvent) {
    console.log('Przekaźnik alergenu', event);
    this.addedAllergen.emit(event);
  }
  addTag(event: MatChipInputEvent) {
    console.log('Przekaźnik tagu', event);
    this.addedTag.emit(event);
  }

  removeAllergen(event: MatChipInputEvent) {
    console.log(event);
    this.removedAllergen.emit(event);
  }

  removeTag(event: MatChipInputEvent) {
    console.log(event);
    this.removedTag.emit(event);
  }
}


