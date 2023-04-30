import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticListComponent } from './diagnostic-list.component';

describe('ListComponent', () => {
  let component: DiagnosticListComponent;
  let fixture: ComponentFixture<DiagnosticListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
