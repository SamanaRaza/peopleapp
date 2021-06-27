import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeTimelineSummaryComponent } from './employee-timeline-summary.component';

describe('EmployeeTimelineSummaryComponent', () => {
  let component: EmployeeTimelineSummaryComponent;
  let fixture: ComponentFixture<EmployeeTimelineSummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeTimelineSummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeTimelineSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
