import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppUserRegistrationComponent } from './app-user-registration.component';

describe('AppUserRegistrationComponent', () => {
  let component: AppUserRegistrationComponent;
  let fixture: ComponentFixture<AppUserRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppUserRegistrationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppUserRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
