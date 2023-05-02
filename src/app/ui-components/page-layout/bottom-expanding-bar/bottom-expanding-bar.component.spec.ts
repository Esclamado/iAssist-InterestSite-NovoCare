import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomExpandingBarComponent } from './bottom-expanding-bar.component';

describe('BottomExpandingBarComponent', () => {
  let component: BottomExpandingBarComponent;
  let fixture: ComponentFixture<BottomExpandingBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottomExpandingBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottomExpandingBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
