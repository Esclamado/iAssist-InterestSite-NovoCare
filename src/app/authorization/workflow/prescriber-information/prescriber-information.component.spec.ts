import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriberInformationComponent } from './prescriber-information.component';

describe('PrescriberInformationComponent', () => {
  let component: PrescriberInformationComponent;
  let fixture: ComponentFixture<PrescriberInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriberInformationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriberInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
