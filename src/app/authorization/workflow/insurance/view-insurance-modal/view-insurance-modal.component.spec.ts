import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewInsuranceModalComponent } from './view-insurance-modal.component';

describe('ViewInsuranceModalComponent', () => {
  let component: ViewInsuranceModalComponent;
  let fixture: ComponentFixture<ViewInsuranceModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewInsuranceModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewInsuranceModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
