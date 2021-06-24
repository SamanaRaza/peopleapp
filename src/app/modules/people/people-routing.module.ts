import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeModule } from './home/home.module';
import { OrganizationEmployeeModule } from './organization-employee/organization-employee.module';
import { PeopleTabComponent } from './people-tab/people-tab.component';

const routes: Routes = [
  {
    path: '',
    component: PeopleTabComponent,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          HomeModule
      },
      {
        path: 'organization-employee',
        loadChildren: () => OrganizationEmployeeModule
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeopleRoutingModule { }
