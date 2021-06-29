import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { Tab } from 'src/app/shared/tabs/tab';

@Component({
  selector: 'anms-employee-profile-tab',
  templateUrl: './employee-profile-tab.component.html',
  styleUrls: ['./employee-profile-tab.component.scss'],
})
export class EmployeeProfileTabComponent implements OnInit {

  constructor() { }
  orgEmployeeProfile: Tab[] = [
    new Tab(1, "Employees", ['/', 'people', 'organization-employee', 'hr-services', 'emp-profile', 'employees']),
    new Tab(2, "Analytics", ['/', 'people', 'organization-employee', 'hr-services', 'emp-profile', 'analytics']),
    new Tab(3, "History & Reports", ['/', 'people', 'organization-employee', 'hr-services', 'emp-profile', 'histroy-reports']),

  ];
  ngOnInit(): void {
  }

}
