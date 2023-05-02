import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PrescriberCertificationComponent } from './prescriber-certification.component';

describe('PrescriberCertificationComponent', () => {
  let component: PrescriberCertificationComponent;
  let fixture: ComponentFixture<PrescriberCertificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriberCertificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriberCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
