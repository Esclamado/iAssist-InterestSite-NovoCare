import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientAssistanceProgramComponent } from './patient-assistance-program.component';

describe('PatientAssistanceProgramComponent', () => {
  let component: PatientAssistanceProgramComponent;
  let fixture: ComponentFixture<PatientAssistanceProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientAssistanceProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientAssistanceProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
