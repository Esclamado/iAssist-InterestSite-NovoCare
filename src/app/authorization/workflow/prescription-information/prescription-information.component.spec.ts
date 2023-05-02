import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriptionInformationComponent } from './prescription-information.component';

describe('PrescriptionInformationComponent', () => {
  let component: PrescriptionInformationComponent;
  let fixture: ComponentFixture<PrescriptionInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriptionInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriptionInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
