import { CommonModule } from '@angular/common';
import { Component, OnInit, NgModule, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'anms-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class EmployeesComponent implements OnInit {
  constructor() { }
  ngOnInit() {

  }
}

