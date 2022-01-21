import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishFormuleComponent } from './dish-formule.component';

describe('FourthComponent', () => {
  let component: DishFormuleComponent;
  let fixture: ComponentFixture<DishFormuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishFormuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishFormuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
