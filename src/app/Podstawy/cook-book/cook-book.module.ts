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
import { MatOptionModule, MatRippleModule } from '@angular/material/core';
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
import { AddIngredientComponent } from './part-components/add-ingredient/add-ingredient.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { ListPageComponent } from './main-components/list-page/list-page.component';
import { SearchBarComponent } from './part-components/search-bar/search-bar.component';
import { RecipiePageComponent } from './main-components/recipie-page/recipie-page.component';
import { MatInputModule } from '@angular/material/input';
import { TagNameByIdPipe } from './pipes/OtherPipes/tag-name-by-id.pipe';
import { MainMenuComponent } from './main-components/main-menu/main-menu.component';
import { MainPageComponent } from './main-components/main-page/main-page.component';
import { RouterModule } from '@angular/router';
import { IngredientDialogComponent } from './part-components/ingredient-dialog/ingredient-dialog.component';
import { DishTranslatorPipe } from './pipes/OtherPipes/dish-translator.pipe';
import { DishTypePipe } from './pipes/dish-type.pipe';
import { MeasuresTranslatorPipe } from './pipes/DishesTranslationPipes/measures-translator.pipe';
import { UsedProductConnectorPipe } from './pipes/DishesTranslationPipes/used-product-connector.pipe';
import { ProductConnectorPipe } from './pipes/DishesTranslationPipes/product-connector.pipe';
import { ProductMeasureConnectorPipe } from './pipes/DishesTranslationPipes/product-measure-connector.pipe';
import { ProductAllMeasuresPipe } from './pipes/OtherPipes/product-all-measures.pipe';
import { MultiplicationPipe } from './pipes/OtherPipes/multiplication.pipe';
import { DishTypeComponent } from './part-components/dish-type/dish-type.component';
import { AbandonEditionComponent } from './part-components/abandon-edition/abandon-edition.component';
import { WordPipe } from './pipes/OtherPipes/word.pipe';
import { DishFormuleComponent } from './part-components/formuleNested/dish-formule/dish-formule.component';
import { ListsFormuleComponent } from './part-components/formuleNested/lists-formule/lists-formule.component';
import { DaysFormuleComponent } from './part-components/formuleNested/days-formule/days-formule.component';
import { MealFormuleComponent } from './part-components/formuleNested/meal-formule/meal-formule.component';
import { ForbiddenNameDirective } from './part-components/formuleNested/forbidden-name.directive';

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
  }
];

@NgModule({
  declarations: [
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
    ListPageComponent,
    SearchBarComponent,
    RecipiePageComponent,
    TagNameByIdPipe,
    MainMenuComponent,
    MainPageComponent,
    IngredientDialogComponent,
    DishTranslatorPipe,
    DishTypePipe,
    MeasuresTranslatorPipe,
    UsedProductConnectorPipe,
    ProductConnectorPipe,
    ProductMeasureConnectorPipe,
    ProductAllMeasuresPipe,
    MultiplicationPipe,
    DishTypeComponent,
    AbandonEditionComponent,
    WordPipe,
    ListsFormuleComponent,
    DaysFormuleComponent,
    DishFormuleComponent,
    MealFormuleComponent,
    ForbiddenNameDirective
  ],
  exports: [
    SideFilterComponent,
    MenuComponent,
    TimeSliderComponent,
    ChipsComponent,
    AddIngredientComponent,
    MainPageComponent,
    IngredientDialogComponent
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
    MatRippleModule
  ],
  entryComponents: [
    IngredientDialogComponent,
    AbandonEditionComponent
  ]
})
export class CookBookModule {
}
