import { TestBed } from '@angular/core/testing';

import { MedicineBillingService } from './medicine-billing.service';

describe('MedicineBillingService', () => {
  let service: MedicineBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MedicineBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
