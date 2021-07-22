import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoGeometryComponent } from './photo-geometry.component';

describe('PhotoGeometryComponent', () => {
  let component: PhotoGeometryComponent;
  let fixture: ComponentFixture<PhotoGeometryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoGeometryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoGeometryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
