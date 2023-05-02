import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedAssistanceComponent } from './need-assistance.component';

describe('NeedAssistanceComponent', () => {
  let component: NeedAssistanceComponent;
  let fixture: ComponentFixture<NeedAssistanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedAssistanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedAssistanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
