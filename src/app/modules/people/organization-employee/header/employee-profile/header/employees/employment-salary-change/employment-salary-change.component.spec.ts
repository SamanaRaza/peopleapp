import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentSalaryChangeComponent } from './employment-salary-change.component';

describe('EmploymentSalaryChangeComponent', () => {
  let component: EmploymentSalaryChangeComponent;
  let fixture: ComponentFixture<EmploymentSalaryChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentSalaryChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentSalaryChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
