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

interface LegendBand {
  color: string
  name: string
}

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
  legend: LegendBand;

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
        (x: any) => x.employee_id == that.queryParams.employeeId
      );
      console.log('data-band', that.chartData);
      console.log('persons', that.persons);
      if (that.persons && that.persons.data.length > 0) {
        that.persons.data.sort(function (a: any, b: any) {
          return a.year - b.year;
        });

        that.persons.data.map((per: any) => that.band.push(per.band));
        that.persons.data.map((per: any) =>
          that.designaiton.push(per.designation)
        );
        that.persons.data.map((per: any) => that.years.push(per.year));

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
        that.generateBandDesignation(that.designaiton, that.band);
        this.cdf.detectChanges();
      }
    });
  }
  generateBandDesignation(data: any, data1: any) {
    let that = this;
    const options: HighCharts.Options = {
      chart: {
        backgroundColor: '#F2F3F4',
        type: 'line',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },
      title: {
        useHTML: true,
        text: 'Band & Designation year wise',
        style: {
          color: '#3B63C8',
          // 'background-color': '#9BE997',
          // 'padding': '28px 333px 10px 250px',
          fontWeight: 'bold'
        }
      },
      yAxis: {
        title: {
          text: 'Band'
        },
        gridLineColor: 'transparent',
        labels: {
          useHTML: true,
          style: {
            'background-color': '#DAD7C4',
            'box-shadow': '3px 3px',
            'padding': '5px'
          }
        },
        min: 5,
        max: 8,
        tickInterval: 0.5,
        lineColor: '#53EA78',
        lineWidth: 3,
        startOnTick: false,
        endOnTick: false,
      },
      xAxis: {
        type: 'datetime',
        lineColor: '#53EA78',
        lineWidth: 3,
        labels: {
          useHTML: true,
          style: {
            'background-color': '#DAD7C4',
            'box-shadow': '3px 3px',
            'padding': '5px'
          }
        },
        tickInterval: 1000 * 3600 * 24 * 365,
        units: [['year', [1]]]
      },
      legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        useHTML: true,
        labelFormatter: function () {
          return '<span  style="background: ' + this.options.color + ' ;color: white;padding: 20px 20px;font-size:16px;font-weight: bold">' + this.name + '</span>'
        }
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
          name: 'Bands',
          type: 'line',
          color: "#4B63A0",
          lineWidth: 4,
          data: data
        },
        {
          name: 'Designations',
          type: 'line',
          color: "#81D8E9",
          lineWidth: 4,
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
