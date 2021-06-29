import { Component, OnInit, ChangeDetectionStrategy, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  selector: 'anms-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
@NgModule({
  declarations: [HeaderComponent],
  imports: [SharedModule, RouterModule]
})
export class EmployeeProfileHeaderModule { }
