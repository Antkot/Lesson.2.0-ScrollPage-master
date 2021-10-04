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
  filterOption$: Observable<object>;
  temporary;

  constructor(private tagsService: TagsStorageService, private allergenService: AllergensStorageService, public activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.filterOption$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state));
    this.filterOption$.subscribe(data => this.temporary = data);
    this.allFilterOptions = this.temporary.allFilterOptions;
  }
  removedTag(deletedTag) {
    this.tagsService.remove(deletedTag);
  }
  removedAllergen(deletedAllergen) {
    this.allergenService.remove(deletedAllergen);
  }
  addedTag(newTag) {
    this.tagsService.add(newTag);
  }
  addedAllergen(newAllergen) {
    this.allergenService.add(newAllergen);
  }
}
