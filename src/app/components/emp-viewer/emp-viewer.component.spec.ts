import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpViewerComponent } from './emp-viewer.component';

describe('EmpViewerComponent', () => {
  let component: EmpViewerComponent;
  let fixture: ComponentFixture<EmpViewerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmpViewerComponent]
    });
    fixture = TestBed.createComponent(EmpViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
