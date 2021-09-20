import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UsedProduct } from '../../types';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  @Output() usedProductToAdd = new  EventEmitter();
  @Input() edit = true;
  @Output() stepsChange = new EventEmitter();
  dishId$ = this.route.url.pipe(
    map(value => value[1].path));
  dishId = '';

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dishId$.pipe(first()).subscribe(dishId => this.dishId = dishId);
  }

  editable() {
    this.edit = !this.edit;
  }

  addUsedProduct(event) {
    this.usedProductToAdd.emit(event);
  }

}





