import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrescriberEmailComponent } from './prescriber-email.component';

describe('PrescriberEmailComponent', () => {
  let component: PrescriberEmailComponent;
  let fixture: ComponentFixture<PrescriberEmailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrescriberEmailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrescriberEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
