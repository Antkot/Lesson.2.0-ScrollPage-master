import { Component, OnInit } from '@angular/core';
import { TagsStorageService } from '../../part-components/services/tags-storage.service';
import { AllergensStorageService } from '../../part-components/services/allergens-storage.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  removeTag = null;
  removeAllergen = null;
  addTag = null;
  addAllergen = null;
  constructor(private tagsService: TagsStorageService, private allergenService: AllergensStorageService) {

  }

  ngOnInit(): void {
  }


  removedTag(event) {
    this.tagsService.remove(event);
  }
  removedAllergen(event) {
    this.allergenService.remove(event);
  }
  addedTag(event) {
    this.tagsService.add(event);
  }
  addedAllergen(event) {
    this.allergenService.add(event);
  }
}
