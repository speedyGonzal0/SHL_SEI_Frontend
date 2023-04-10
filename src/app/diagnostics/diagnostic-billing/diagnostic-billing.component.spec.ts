import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticBillingComponent } from './diagnostic-billing.component';

describe('DiagnosticBillingComponent', () => {
  let component: DiagnosticBillingComponent;
  let fixture: ComponentFixture<DiagnosticBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
