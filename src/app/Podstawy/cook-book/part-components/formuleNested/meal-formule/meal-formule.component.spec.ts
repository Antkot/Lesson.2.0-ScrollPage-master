import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MealFormuleComponent } from './meal-formule.component';

describe('ThirdComponent', () => {
  let component: MealFormuleComponent;
  let fixture: ComponentFixture<MealFormuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MealFormuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MealFormuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
