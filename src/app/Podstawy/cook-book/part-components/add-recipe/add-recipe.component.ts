import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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
  @Output() stepsChange  = new EventEmitter();
  constructor() {
  }

  ngOnInit(): void {
  }

  editable() {
    this.edit = !this.edit;
  }
}





