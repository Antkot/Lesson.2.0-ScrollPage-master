import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DaysFormuleComponent } from './days-formule.component';

describe('FormuleInputComponent', () => {
  let component: DaysFormuleComponent;
  let fixture: ComponentFixture<DaysFormuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DaysFormuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DaysFormuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
