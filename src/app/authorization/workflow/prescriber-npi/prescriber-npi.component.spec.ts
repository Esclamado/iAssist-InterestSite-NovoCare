import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriberNpiComponent } from './prescriber-npi.component';

describe('PrescriberNpiComponent', () => {
  let component: PrescriberNpiComponent;
  let fixture: ComponentFixture<PrescriberNpiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriberNpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriberNpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
