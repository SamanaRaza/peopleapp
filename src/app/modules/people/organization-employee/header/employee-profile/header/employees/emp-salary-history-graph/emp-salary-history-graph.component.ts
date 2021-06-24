import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { SalaryChangeHistoryGraphService } from '../../../../../../../../services/salary-change-history-graph.service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'anms-emp-salary-history-graph',
  templateUrl: './emp-salary-history-graph.component.html',
  styleUrls: ['./emp-salary-history-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class EmpSalaryHistoryGraphComponent implements OnInit {
  @ViewChild('chartContainer') ChartContainer: ElementRef;
  data: any = {};
  queryParams: any = {};
  persons: any = [];
  chartData: any = [];
  salary: any = [];
  startYear: any;
  years: any = [];
  yearsBetween: any = [];
  constructor(
    private httpClient: HttpClient,
    private lineChartService: SalaryChangeHistoryGraphService,
    private route: ActivatedRoute
  ) { }
  ngOnInit() {
    let that = this;
    const currentYear = new Date().getFullYear();
  }
  ngAfterViewInit() {
    this.queryParams = this.route.snapshot.queryParams;

    let that = this;
    this.lineChartService.getGraph().subscribe((data) => {
      this.persons = (data as any).data;
      console.log('Line', this.persons);
      this.data = this.persons.find(
        (x: any) => x.employeeId == that.queryParams.employeeId
      );
      if (this.data && this.data.details.length > 0) {
        this.data.details.sort(function (a: any, b: any) {
          return a.year - b.year;
        });
        this.data.details.map((per: any) => that.salary.push(per.salary));
        this.data.details.map((per: any) => that.years.push(per.year));
        var t = new Date().getFullYear() - 9;

        var Start = new Date(t, 0, 1);
        var End = new Date(that.years[0], 0, 1);

        var syears = moment(End).diff(Start, 'years');

        for (var year = 0; year < syears; year++)
          this.yearsBetween.push(Start.getFullYear() + year);

        this.startYear = this.yearsBetween[0]
          ? this.yearsBetween[0]
          : new Date().getFullYear() - 9;

        for (var yb = 0; yb < this.yearsBetween.length; yb++) {
          this.salary.unshift(null);
        }

        //

        this.generatePie(that.salary.slice(0, 9));
      } else {
        var t = new Date().getFullYear() - 9;
        var Start = new Date(t, 0, 1);
        var End = new Date(new Date().getFullYear(), 0, 1);
        this.startYear = new Date().getFullYear() - 9;
        var syears = moment(End).diff(Start, 'years');

        for (var year = 0; year < syears; year++) {
          this.yearsBetween.push(Start.getFullYear() + year);
        }
        for (var yb = 0; yb < this.yearsBetween.length; yb++) {
          this.salary.unshift(null);
        }

        console.log('salary', this.salary);
        console.log('startyear', this.startYear);
        this.generatePie(that.salary);
      }
    });
  }
  generatePie(data: any) {
    let that = this;
    const options: HighCharts.Options = {
      title: {
        text: 'Year, 2012-2020'
      },
      subtitle: {
        text: 'Salary 12K => 1000K'
      },
      yAxis: {
        min: 10000,
        max: 100000,
        tickInterval: 10000,
        gridLineWidth: 0,
        startOnTick: false,
        endOnTick: false,
        title: {
          text: 'Salary'
        },
        labels: {
          format: '{value:.0f}'
        },
        maxPadding: 0.2
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 1000 * 3600 * 24 * 365,
        units: [['year', [1]]],
        accessibility: {
          rangeDescription: 'Range: 2012 to 2020'
        }
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: Date.UTC(this.startYear, 0, 1),
          pointInterval: (365 * 24 * 3600 * 1000) / 1
        }
      },
      series: [
        {
          name: 'Salary',
          type: 'line',
          data: data
        }
      ],
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }
        ]
      }
    };
    HighCharts.chart(that.ChartContainer.nativeElement, options);
  }
}
