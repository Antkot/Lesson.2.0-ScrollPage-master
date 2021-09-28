import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishTypeComponent } from './dish-type.component';

describe('DishTypeComponent', () => {
  let component: DishTypeComponent;
  let fixture: ComponentFixture<DishTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
