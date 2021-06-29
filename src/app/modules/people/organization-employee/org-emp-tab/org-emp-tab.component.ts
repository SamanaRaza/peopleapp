import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Tab } from 'src/app/shared/tabs/tab';

@Component({
  selector: 'anms-org-emp-tab',
  templateUrl: './org-emp-tab.component.html',
  styleUrls: ['./org-emp-tab.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class OrgEmpTabComponent implements OnInit {

  constructor() { }

  default: any = 'company-setup';
  orgEmployeeTabs: Tab[] = [
    new Tab(1, "Company Setup", ['/', 'people', 'organization-employee', 'hr-services', 'company-setup']),
    new Tab(2, "Org Chart", ['/', 'people', 'organization-employee', 'hr-services', 'org-chart']),
    new Tab(3, "Access Matrix", ['/', 'people', 'organization-employee', 'hr-services', 'access-matrix']),
    new Tab(4, "Employee Profile", ['/', 'people', 'organization-employee', 'hr-services']),
  ];

  ngOnInit(): void {
  }

}
