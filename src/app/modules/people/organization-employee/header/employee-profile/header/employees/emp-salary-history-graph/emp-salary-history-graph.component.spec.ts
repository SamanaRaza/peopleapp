import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpSalaryHistoryGraphComponent } from './emp-salary-history-graph.component';

describe('EmpSalaryHistoryGraphComponent', () => {
  let component: EmpSalaryHistoryGraphComponent;
  let fixture: ComponentFixture<EmpSalaryHistoryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpSalaryHistoryGraphComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpSalaryHistoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
