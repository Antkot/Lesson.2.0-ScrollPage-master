import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatRadioModule} from '@angular/material/radio';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TimeSliderComponent } from './part-components/time-slider/time-slider.component';
import { SideFilterComponent } from './part-components/side-filter/side-filter.component';
import { MenuComponent } from './part-components/menu/menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { LoadingService } from './part-components/services/loading.service';


@NgModule({
  declarations: [SideFilterComponent, MenuComponent, TimeSliderComponent, LoadingService],
  imports: [
    CommonModule, MatDividerModule, MatExpansionModule, MatRadioModule, NgxSliderModule, MatCheckboxModule, MatIconModule
  ]
})
export class CookBookModule { }
