import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipiePageComponent } from './recipie-page.component';

describe('RecipiePageComponent', () => {
  let component: RecipiePageComponent;
  let fixture: ComponentFixture<RecipiePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecipiePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipiePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
