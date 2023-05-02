import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexStartContainerComponent } from './flex-start-container.component';

describe('FlexStartContainerComponent', () => {
  let component: FlexStartContainerComponent;
  let fixture: ComponentFixture<FlexStartContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FlexStartContainerComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexStartContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
