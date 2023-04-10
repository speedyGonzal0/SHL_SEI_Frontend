import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorBillingComponent } from './doctor-billing.component';

describe('DoctorBillingComponent', () => {
  let component: DoctorBillingComponent;
  let fixture: ComponentFixture<DoctorBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoctorBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
