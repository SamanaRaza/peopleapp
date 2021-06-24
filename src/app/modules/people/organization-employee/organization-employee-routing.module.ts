import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgEmpHostComponent } from './header/org-emp-host.component';
import { OrgEmpTabComponent } from './org-emp-tab/org-emp-tab.component';
import { EmpProfileHostComponent } from './header/employee-profile/emp-profile-host.component';
import { EmployeeProfileTabComponent } from './header/employee-profile/employee-profile-tab/employee-profile-tab.component';
import { EmploymentSalaryChangeComponent } from './header/employee-profile/header/employees/employment-salary-change/employment-salary-change.component';
import { EmploymentChangeHistoryComponent } from './header/employee-profile/header/employees/employment-change-history/employment-change-history.component';
import { EmploymentStoryComponent } from './header/employee-profile/header/employees/employment-story/employment-story.component';
import { EmpHistoryComponent } from './header/employee-profile/header/employees/emp-history/emp-history.component';

const routes: Routes = [
  {
    path: 'hr-services',
    component: OrgEmpTabComponent,
    children: [
      {
        path: '',
        component: OrgEmpHostComponent,
      },
      {
        path: 'emp-profile',
        component: EmployeeProfileTabComponent,
        children: [
          {
            path: 'employees',
            children: [
              {
                path: '',
                component: EmpProfileHostComponent
              },
              {
                path: 'salary-change',
                component: EmploymentSalaryChangeComponent
              },
              {
                path: 'EmploymentChangeLog',
                component:EmploymentChangeHistoryComponent
              },
              {
                path: 'empHistory',
                component:EmpHistoryComponent
              },
            ]
          },
          {
            path: 'analytics',
            component: EmpProfileHostComponent
          },
          {
            path: 'histroy-reports',
            component: EmpProfileHostComponent
          },
        ]
      },
      {
        path: 'company-setup',
        component: OrgEmpHostComponent
      },
      {
        path: 'org-chart',
        component: OrgEmpHostComponent
      },
      {
        path: 'access-matrix',
        component: OrgEmpHostComponent
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrganizationEmployeeRoutingModule { }
