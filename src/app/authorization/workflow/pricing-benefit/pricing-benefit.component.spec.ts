import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricingBenefitComponent } from './pricing-benefit.component';

describe('PricingBenefitComponent', () => {
  let component: PricingBenefitComponent;
  let fixture: ComponentFixture<PricingBenefitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricingBenefitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricingBenefitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
