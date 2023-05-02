import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCustomModalComponent } from './form-custom-modal.component';

describe('FormCustomModalComponent', () => {
  let component: FormCustomModalComponent;
  let fixture: ComponentFixture<FormCustomModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormCustomModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCustomModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
