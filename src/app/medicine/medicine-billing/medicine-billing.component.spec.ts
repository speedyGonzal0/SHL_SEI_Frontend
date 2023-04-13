import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineBillingComponent } from './medicine-billing.component';

describe('MedicineBillingComponent', () => {
  let component: MedicineBillingComponent;
  let fixture: ComponentFixture<MedicineBillingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MedicineBillingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineBillingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
