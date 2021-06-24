import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'anms-employee-profile',
  templateUrl: './employee-profile.component.html',
  styleUrls: ['./employee-profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class EmployeeProfileComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
