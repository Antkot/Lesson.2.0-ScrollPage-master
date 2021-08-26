import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-time-slider',
  templateUrl: './time-slider.component.html',
  styleUrls: ['./time-slider.component.scss']
})
export class TimeSliderComponent implements OnInit {
  constructor() {
  }
  @Input() value = 2;
  @Output() timeLimit = new EventEmitter();
  options: Options = {
    showTicksValues: true,
    floor: 0,
    ceil: 3,
    translate: (value: number): string => {
      switch (value) {
        case 0:
          this.timeLimit.next('15 min');
          return '15 min';
        case 1:
          this.timeLimit.next('1 h');
          return '1 h';
        case 2:
          this.timeLimit.next('3h');
          return '3h';
        default:
          this.timeLimit.next('Dowolny');
          return 'Dowolny';
      }
    }
  };
  // addNewItem(value: string) {
  //   this.timeLimit.emit(value);
  // }

  ngOnInit(): void {
  }

}
