import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrganizationEmployeeRoutingModule } from './organization-employee-routing.module';
import { HeaderComponent } from './header/header.component';
import { OrgEmpTabComponent } from './org-emp-tab/org-emp-tab.component';
import { OrgEmpHostComponent } from "./header/org-emp-host.component";
import { EmpProfileHostComponent } from "./header/employee-profile/emp-profile-host.component";
import { EmployeeProfileTabComponent } from './header/employee-profile/employee-profile-tab/employee-profile-tab.component';
import { SharedModule } from '../../../shared/shared.module';
import { EmploymentSalaryChangeComponent } from './header/employee-profile/header/employees/employment-salary-change/employment-salary-change.component';
import { EmploymentChangeHistoryComponent } from './header/employee-profile/header/employees/employment-change-history/employment-change-history.component';
import { EmploymentStoryComponent } from './header/employee-profile/header/employees/employment-story/employment-story.component';
import { TransferStoryComponent } from './header/employee-profile/header/employees/transfer-story/transfer-story.component';
import { EmpHistoryComponent } from './header/employee-profile/header/employees/emp-history/emp-history.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BandDesignationGraphComponent } from './header/employee-profile/header/employees/band-designation-graph/band-designation-graph.component';
import { EmpSalaryHistoryGraphComponent } from './header/employee-profile/header/employees/emp-salary-history-graph/emp-salary-history-graph.component';
import { PerformanceHistoryGraphComponent } from './header/employee-profile/header/employees/performance-history-graph/performance-history-graph.component';
import { FixedAmountDialogComponent } from './header/employee-profile/header/employees/fixed-amount-dialog/fixed-amount-dialog.component';
import { VariableComponentsDialogComponent } from './header/employee-profile/header/employees/variable-components-dialog/variable-components-dialog.component';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    HeaderComponent,
    OrgEmpTabComponent,
    OrgEmpHostComponent,
    EmpProfileHostComponent,
    EmployeeProfileTabComponent,
    EmploymentSalaryChangeComponent,
    EmploymentChangeHistoryComponent,
    EmploymentStoryComponent,
    TransferStoryComponent,
    EmpHistoryComponent,
    BandDesignationGraphComponent,
    EmpSalaryHistoryGraphComponent,
    PerformanceHistoryGraphComponent,
    FixedAmountDialogComponent,
    VariableComponentsDialogComponent
  ],
  imports: [
    CommonModule,
    OrganizationEmployeeRoutingModule,
    SharedModule,
    FontAwesomeModule,
    FormsModule
  ],

})
export class OrganizationEmployeeModule { }
