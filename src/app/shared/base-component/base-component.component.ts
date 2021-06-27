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

  startingYear: any = new Date().getFullYear() - 9

  constructor() { }

  ngOnInit(): void {
  }

  graphDataCustomization(employees: any = {}) {
    let that = this;
    var yearsBetween = [];
    that.employeData = employees;
    that.employeData.data = employees && employees.data ? employees.data : employees && employees.details ? employees.details : [];
    if (that.employeData && that.employeData.data.length > 0) {
      that.employeData.data.sort(function (a: any, b: any) {
        return a.year - b.year;
      });

      that.employeData.data.map((per: any) => that.band.push(per.band));
      that.employeData.data.map((per: any) =>
        that.designation.push(per.designation)
      );
      that.employeData.data.map((per: any) =>
        that.salary.push(per.salary)
      );
      that.employeData.data.map((per: any) => that.years.push(per.year));

      var startYear = new Date(this.startingYear, 0, 1);
      var endYear = new Date(that.years[0], 0, 1);

      var allYears = moment(endYear).diff(startYear, 'years');

      for (var year = 0; year < allYears; year++)
        yearsBetween.push(startYear.getFullYear() + year);

      this.startingYear = yearsBetween[0]
        ? yearsBetween[0]
        : new Date().getFullYear() - 9;

      for (var yb = 0; yb < yearsBetween.length; yb++) {
        that.band.unshift(null);
        that.designation.unshift(null);
        that.salary.unshift(null);
      }
    }
    else {

      var startyear = new Date(this.startingYear, 0, 1);
      var endyear = new Date(new Date().getFullYear(), 0, 1);

      var allYears = moment(endyear).diff(startyear, 'years');

      for (var year = 0; year < allYears; year++) {
        yearsBetween.push(startyear.getFullYear() + year);
      }
      for (var yb = 0; yb < yearsBetween.length; yb++) {
        that.band.unshift(null);
        that.designation.unshift(null);
        that.salary.unshift(null);
      }
    }
  }

}
