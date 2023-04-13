import { TestBed } from '@angular/core/testing';

import { DoctorBillingService } from './doctor-billing.service';

describe('DoctorBillingService', () => {
  let service: DoctorBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
