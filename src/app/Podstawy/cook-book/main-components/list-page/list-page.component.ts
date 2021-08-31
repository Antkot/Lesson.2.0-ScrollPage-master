import { Component, OnInit } from '@angular/core';
import { TagsStorageService } from '../../part-components/services/tags-storage.service';

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
  constructor(private tagsService: TagsStorageService) {

  }

  ngOnInit(): void {
  }


  removedTag(event) {
    this.removeTag = event;
    console.log(event);
  }
  removedAllergen(event) {
    this.removeAllergen = event;
  }
  addedTag(event) {
    console.log('Ostatni przekaźnik');
    this.addTag = event;
    this.tagsService.add(event);
    console.log('przekaźnik zakonczył pracę');
  }
  addedAllergen(event) {
    console.log('Ostatni przekaźnik');
    this.addAllergen = event;
    this.tagsService.add(event);
    console.log('przekaźnik zakonczył pracę');
  }
}
