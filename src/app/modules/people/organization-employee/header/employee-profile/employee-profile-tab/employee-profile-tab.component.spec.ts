import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeProfileTabComponent } from './employee-profile-tab.component';

describe('EmployeeProfileTabComponent', () => {
  let component: EmployeeProfileTabComponent;
  let fixture: ComponentFixture<EmployeeProfileTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeProfileTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeProfileTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
