import { NgModule } from '@angular/core';

import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './header/header.component';
import { SharedModule } from '../../../shared/shared.module';

@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, HomeRoutingModule]
})
export class HomeModule { }
