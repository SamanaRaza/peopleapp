import { Component, OnInit } from '@angular/core';
import moment from 'moment';

@Component({
  selector: 'app-base-component',
  templateUrl: './base-component.component.html',
  styleUrls: ['./base-component.component.scss']
})
export class BaseComponentComponent implements OnInit {

  designation: any[] = [];
  band: any[] = [];
  salary: any[] = [];
  years: any = [];
  employeData: any = {};
  values: any = {
    "5": 0,
    "5.0": 0,
    "5.1": 1,
    "5.2": 2,
    "5.3": 2.3,
    "5.4": 2.4,
    "5.5": 2.5,
    "5.6": 2.6,
    "5.7": 2.7,
    "5.8": 2.8,
    "5.9": 2.9,
    "6": 3,
    "6.0": 3,
    "6.1": 3.1,
    "6.2": 3.2,
    "6.3": 3.3,
    "6.4": 3.4,
    "6.5": 3.5,
    "6.6": 3.6,
    "6.7": 3.7,
    "6.8": 3.8,
    "6.9": 3.9,
    "7": 4,
    "7.0": 4,
    "7.1": 4.1,
    "7.2": 4.2,
    "7.3": 4.3,
    "7.4": 4.4,
    "7.5": 4.5,
    "7.6": 4.6,
    "7.7": 4.7,
    "7.8": 4.8,
    "7.9": 4.9,
    "8": 5,
    "8.0": 5,
    "8.1": 5.1,
    "8.2": 5.2,
    "8.3": 5.3,
    "8.4": 5.4,
    "8.5": 5.5,
    "8.6": 5.6,
    "8.7": 5.7,
    "8.8": 5.8,
    "8.9": 5.9,

  };

  startingYear: any = new Date().getFullYear() - 9

  constructor() { }

  ngOnInit(): void {
  }

  graphDataCustomization(employees: any = {}, salary: any = {}) {
    let that = this;

    this.startingYear = new Date().getFullYear() - 9;

    var startYear = new Date(this.startingYear, 0, 1);
    var endYear = new Date(new Date().getFullYear(), 0, 1);

    var allYears = moment(endYear).diff(startYear, 'years');
    for (var year = 0; year < allYears; year++)
      that.years.push((startYear.getFullYear() + year).toString());

    if (employees) {
      const employee_band_year = Object.keys(employees);
      const employee_band_data: any = Object.values(employees);
      employee_band_data.map((result: any, index: any) => {
        var data: any[] = result[0] && result[0].employee__histories_group;
        if (data && data.length > 0) {
          data.map((band: any, index: any) => {
            that.band.push(that.values[band.new_label])
          })
        }
        else {
          that.band.push(null)
        }
      });
    }
    if (salary) {
      const employee_salary_year = Object.keys(salary);
      const employee_salary_data: any = Object.values(salary);
      employee_salary_data.map((result: any, index: any) => {

        var data: any = result[0] && result[0].employee_salary_history;
        if (data) {
          that.salary.push(parseInt(data.new_salary))
        }
        else {
          that.salary.push(null)
        }
      });
    }
  }
}
