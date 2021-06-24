import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { BandDesignationGraphService } from '../../../../../../../../services/band-designation-graph.service';
import { ActivatedRoute } from '@angular/router';
import moment from 'moment';

@Component({
  selector: 'anms-band-designation-graph',
  templateUrl: './band-designation-graph.component.html',
  styleUrls: ['./band-designation-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class BandDesignationGraphComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') ChartContainer: ElementRef;
  data: any = {};
  persons: any = {};
  chartData: any = [];
  band: any = [];
  designaiton: any = [];
  queryParams: any = {};
  years: any = [];
  yearsBetween: any = [];
  startYear: any;

  constructor(
    private httpClient: HttpClient,
    private bandDesignationGraphService: BandDesignationGraphService,
    private route: ActivatedRoute,
    private cdf: ChangeDetectorRef
  ) { }
  ngOnInit() {
    let that = this;
  }
  ngAfterViewInit() {
    let that = this;
    that.queryParams = that.route.snapshot.queryParams;
    that.bandDesignationGraphService.getGraph().subscribe((data) => {
      that.chartData = (data as any).data;
      that.persons = that.chartData.find(
        (x: any) => x.EmployeeID == that.queryParams.employeeId
      );
      console.log('data-band', that.chartData);
      console.log('persons', that.persons);
      if (that.persons && that.persons.details.length > 0) {
        that.persons.details.sort(function (a: any, b: any) {
          return a.year - b.year;
        });

        that.persons.details.map((per: any) => that.band.push(per.Band));
        that.persons.details.map((per: any) =>
          that.designaiton.push(per.Designation)
        );
        that.persons.details.map((per: any) => that.years.push(per.year));

        var initialYear = new Date().getFullYear() - 9;

        var Start = new Date(initialYear, 0, 1);
        var End = new Date(that.years[0], 0, 1);

        var syears = moment(End).diff(Start, 'years');

        for (var year = 0; year < syears; year++)
          this.yearsBetween.push(Start.getFullYear() + year);

        that.startYear = that.yearsBetween[0]
          ? that.yearsBetween[0]
          : new Date().getFullYear() - 9;

        for (var yb = 0; yb < that.yearsBetween.length; yb++) {
          that.band.unshift(null);
          that.designaiton.unshift(null);
        }
        that.generatePie(that.designaiton, that.band);
        this.cdf.detectChanges();
      }
    });
  }
  generatePie(data: any, data1: any) {
    let that = this;
    const options: HighCharts.Options = {
      title: {
        text: 'Year, 2012-2020'
      },
      subtitle: {
        text: 'Band 5 => 7'
      },
      yAxis: {
        title: {
          text: 'Band'
        },
        min: 1,
        max: 8,
        tickInterval: 1,
        gridLineWidth: 0,
        startOnTick: false,
        endOnTick: false,
        labels: {
          format: '{value:.0f}'
        }
      },
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 2012 to 2020'
        },
        type: 'datetime',
        tickInterval: 1000 * 3600 * 24 * 365,
        units: [['year', [1]]]
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
          name: 'Band',
          type: 'line',
          data: data
        },
        {
          name: 'Designation',
          type: 'line',
          data: data1
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
