import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderAttestationComponent } from './provider-attestation.component';

describe('ProviderAttestationComponent', () => {
  let component: ProviderAttestationComponent;
  let fixture: ComponentFixture<ProviderAttestationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderAttestationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderAttestationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
