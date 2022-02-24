import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToDoTestComponent } from './to-do-test.component';

describe('ToDoTestComponent', () => {
  let component: ToDoTestComponent;
  let fixture: ComponentFixture<ToDoTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToDoTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToDoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
