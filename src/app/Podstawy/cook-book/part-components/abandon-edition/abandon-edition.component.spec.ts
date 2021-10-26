import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AbandonEditionComponent } from './abandon-edition.component';

describe('AbandonEditionComponent', () => {
  let component: AbandonEditionComponent;
  let fixture: ComponentFixture<AbandonEditionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AbandonEditionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AbandonEditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
