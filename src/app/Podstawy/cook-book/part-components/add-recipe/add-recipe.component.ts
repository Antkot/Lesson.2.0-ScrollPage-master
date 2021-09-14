import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  @Input() edit = true;
  // @Input() dish;
  @Output() stepsChange  = new EventEmitter();
  dishId$ = this.route.url.pipe(
    map(value => value[1].path));
  dishId;
  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.dishId$.pipe().subscribe(dishId => this.dishId = dishId
    );
  }

  editable() {
    this.edit = !this.edit;
  }
}





