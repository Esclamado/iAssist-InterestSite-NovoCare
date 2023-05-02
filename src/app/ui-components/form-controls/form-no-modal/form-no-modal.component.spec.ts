import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormNoModalComponent } from './form-no-modal.component';

describe('FormNoModalComponent', () => {
  let component: FormNoModalComponent;
  let fixture: ComponentFixture<FormNoModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormNoModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormNoModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
