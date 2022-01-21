import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListsFormuleComponent } from './lists-formule.component';

describe('FormuleComponent', () => {
  let component: ListsFormuleComponent;
  let fixture: ComponentFixture<ListsFormuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListsFormuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListsFormuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
