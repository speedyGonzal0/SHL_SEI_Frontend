import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosticDetailsComponent } from './diagnostic-details.component';

describe('DetailsComponent', () => {
  let component: DiagnosticDetailsComponent;
  let fixture: ComponentFixture<DiagnosticDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiagnosticDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosticDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
