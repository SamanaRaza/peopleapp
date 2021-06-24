import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgEmpTabComponent } from './org-emp-tab.component';

describe('OrgEmpTabComponent', () => {
  let component: OrgEmpTabComponent;
  let fixture: ComponentFixture<OrgEmpTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrgEmpTabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgEmpTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
