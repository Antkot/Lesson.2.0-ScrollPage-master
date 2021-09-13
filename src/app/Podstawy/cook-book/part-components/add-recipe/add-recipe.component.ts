import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  @Input() edit = true;
  @Input() name = '';
  @Input() tags = [];
  @Input() steps = [];
  @Input() products = [];

  constructor() {
  }

  ngOnInit(): void {
  }

  editable() {
    this.edit = !this.edit;
  }
}





