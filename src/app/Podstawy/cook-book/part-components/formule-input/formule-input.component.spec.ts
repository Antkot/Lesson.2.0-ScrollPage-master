import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormuleInputComponent } from './formule-input.component';

describe('FormuleInputComponent', () => {
  let component: FormuleInputComponent;
  let fixture: ComponentFixture<FormuleInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormuleInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormuleInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
