import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TagsStorageService } from '../../part-components/services/tags-storage.service';
import { AllergensStorageService } from '../../part-components/services/allergens-storage.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  allFilterOptions = new EventEmitter();
  filterOption$: Observable<{allFilterOptions: boolean, navigationId: number}>;
  temporary: {allFilterOptions: boolean, navigationId: number};

  constructor(private tagsService: TagsStorageService, private allergenService: AllergensStorageService, public activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.filterOption$ = this.activatedRoute.paramMap
      .pipe(map(() => history.state));
    this.filterOption$.subscribe(data => this.temporary = data);
    // console.log(123456789000000000);
    // do przebudowy
    // console.log(this.temporary);
    this.allFilterOptions.emit(this.temporary.allFilterOptions);
  }
  removedTag(deletedTag: number) {
    this.tagsService.remove(deletedTag);
  }
  removedAllergen(hashIndex: number) {
    this.allergenService.remove(hashIndex);
  }
  addedTag(newTag: string) {
    this.tagsService.add(newTag);
  }
  addedAllergen(newAllergen: string) {
    this.allergenService.add(newAllergen);
  }
}
