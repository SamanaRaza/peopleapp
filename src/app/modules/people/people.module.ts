import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeopleRoutingModule } from './people-routing.module';
import { PeopleTabComponent } from './people-tab/people-tab.component';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [
    PeopleTabComponent
  ],
  imports: [
    CommonModule,
    PeopleRoutingModule,
    SharedModule
  ]
})
export class PeopleModule { }
