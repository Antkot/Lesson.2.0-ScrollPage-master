import { Component, OnInit } from '@angular/core';
import { TagsStorageService } from '../../part-components/services/tags-storage.service';
import { AllergensStorageService } from '../../part-components/services/allergens-storage.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.scss']
})
export class ListPageComponent implements OnInit {
  removeTag;
  removeAllergen;
  addTag;
  addAllergen;
  constructor(private tagsService: TagsStorageService, private allergenService: AllergensStorageService) {

  }

  ngOnInit(): void {
  }


  removedTag(event) {
    this.removeTag = event;
    this.tagsService.remove(event);
    console.log('Removing', event);
  }
  removedAllergen(event) {
    this.removeAllergen = event;
  }
  addedTag(event) {
    this.addTag = event;
    this.tagsService.add(event);
  }
  addedAllergen(event) {
    this.addAllergen = event;
    this.allergenService.add(event);
  }
}
