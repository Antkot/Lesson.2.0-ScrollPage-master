import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { TimeSliderComponent } from './part-components/time-slider/time-slider.component';
import { SideFilterComponent } from './part-components/side-filter/side-filter.component';
import { MenuComponent } from './part-components/menu/menu.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { ChipsComponent } from './part-components/chips/chips.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListedComponent } from './part-components/listed/listed.component';
import { SorterComponent } from './part-components/sorter/sorter.component';
import { MatSelectModule } from '@angular/material/select';
import { AddRecipeComponent } from './part-components/add-recipe/add-recipe.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { StepsComponent } from './part-components/steps/steps.component';
import { MatMenuModule } from '@angular/material/menu';
import { IngredientsComponent } from './part-components/ingredients/ingredients.component';
import { MatTableModule } from '@angular/material/table';
import { AddIngredientComponent, IngredientDialogComponent } from './part-components/add-ingredient/add-ingredient.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ListPageComponent } from './main-components/list-page/list-page.component';
import { SearchBarComponent } from './part-components/search-bar/search-bar.component';
import { RecipiePageComponent } from './main-components/recipie-page/recipie-page.component';
import { MatInputModule } from '@angular/material/input';
import { TagNameByIdPipe } from './pipes/tag-name-by-id.pipe';
import { MainMenuComponent } from './main-components/main-menu/main-menu.component';
import { MainPageComponent } from './main-components/main-page/main-page.component';
import { RouterModule } from '@angular/router';

const links = [
  {
    component: MainPageComponent,
    path: 'main'
  },
  {
    component: MainMenuComponent,
    path: 'menu'
  },
  {
    component: ListPageComponent,
    path: 'list'
  },
  {
    component: RecipiePageComponent,
    path: 'recipe/:dishId'
  },
  {
    component: RecipiePageComponent,
    path: 'recipe/new'
  },
];
@NgModule({
  declarations: [
    SearchBarComponent,
    SideFilterComponent,
    MenuComponent,
    TimeSliderComponent,
    ChipsComponent,
    ListedComponent,
    SorterComponent,
    AddRecipeComponent,
    StepsComponent,
    IngredientsComponent,
    AddIngredientComponent,
    IngredientDialogComponent,
    ListPageComponent,
    SearchBarComponent,
    RecipiePageComponent,
    TagNameByIdPipe,
    MainMenuComponent,
    MainPageComponent

  ],
  exports: [
    SideFilterComponent,
    MenuComponent,
    TimeSliderComponent,
    ChipsComponent,
    AddIngredientComponent,
    IngredientDialogComponent,
    MainPageComponent
  ],
  imports: [
    RouterModule.forRoot(links, { useHash: true }),
    CommonModule,
    MatDividerModule,
    MatExpansionModule,
    MatRadioModule,
    NgxSliderModule,
    MatCheckboxModule,
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatOptionModule,
    BrowserAnimationsModule,
    MatSelectModule,
    DragDropModule,
    MatMenuModule,
    FormsModule,
    MatTableModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
  ]
})
export class CookBookModule {
}
