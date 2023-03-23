import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiagnosticComponent } from './create-diagnostic.component';

describe('CreateDiagnosticComponent', () => {
  let component: CreateDiagnosticComponent;
  let fixture: ComponentFixture<CreateDiagnosticComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDiagnosticComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
