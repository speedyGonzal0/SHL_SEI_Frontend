import { TestBed } from '@angular/core/testing';

import { DiagnosticBillingService } from './diagnostic-billing.service';

describe('DiagnosticBillingService', () => {
  let service: DiagnosticBillingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiagnosticBillingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
