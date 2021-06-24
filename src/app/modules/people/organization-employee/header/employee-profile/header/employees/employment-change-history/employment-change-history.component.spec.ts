import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentChangeHistoryComponent } from './employment-change-history.component';

describe('EmploymentChangeHistoryComponent', () => {
  let component: EmploymentChangeHistoryComponent;
  let fixture: ComponentFixture<EmploymentChangeHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentChangeHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmploymentChangeHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
