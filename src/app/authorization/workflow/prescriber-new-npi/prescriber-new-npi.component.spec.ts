import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriberNewNpiComponent } from './prescriber-new-npi.component';

describe('PrescriberNewNpiComponent', () => {
  let component: PrescriberNewNpiComponent;
  let fixture: ComponentFixture<PrescriberNewNpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriberNewNpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriberNewNpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
