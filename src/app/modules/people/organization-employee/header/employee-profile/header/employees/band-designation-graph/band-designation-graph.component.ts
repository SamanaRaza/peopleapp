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
import { ActivatedRoute } from '@angular/router';
import { BaseComponentComponent } from 'src/app/shared/base-component/base-component.component';
import { AllServicesService } from 'src/app/services/all-services.service'
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
export class BandDesignationGraphComponent extends BaseComponentComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') ChartContainer: ElementRef;
  data: any = {};
  queryParams: any = {};
  legend: LegendBand;

  constructor(
    private httpClient: HttpClient,
    private allServicesService: AllServicesService,
    private route: ActivatedRoute,
    private cdf: ChangeDetectorRef
  ) { super(); }
  ngOnInit() {
    let that = this;
  }
  ngAfterViewInit() {
    let that = this;
    that.queryParams = that.route.snapshot.queryParams;
    that.allServicesService.getBandGraph().subscribe((data) => {
      var data = (data as any).data;
      var employees = data.find(
        (x: any) => x.employee_id == that.queryParams.employeeId
      );

      that.graphDataCustomization(employees);
      that.generateBandDesignation(that.band, that.designation, that.startingYear);

    });
  }
  generateBandDesignation(bands: any, designations: any, startYear: any) {
    let that = this;
    const options: HighCharts.Options = {
      chart: {
        backgroundColor: '#F2F3F4',
        type: 'line',
        plotBorderWidth: 0,
        zoomType: 'xy',
      },
      credits: {
        enabled: false
      },
      title: {
        useHTML: true,
        text: 'Band & Designation year wise',
        style: {
          color: '#3B63C8',
          fontWeight: 'bold'
        }
      },
      yAxis: {
        title: {
          text: ''
        },
        gridLineColor: 'transparent',
        labels: {
          useHTML: true,
          style: {
            color: '#3498DB',
            'background-color': 'white',
            'padding': '4px',
            'box-shadow': '0px 1px',
            'font-weight': 'bold'
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
            color: '#3498DB',
            'background-color': 'white',
            'padding': '4px',
            'box-shadow': '0px 1px',
            'font-weight': 'bold'
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
          pointStart: Date.UTC(startYear, 0, 1),
          pointInterval: (365 * 24 * 3600 * 1000) / 1
        }
      },
      series: [
        {
          name: 'Bands',
          type: 'line',
          color: "#4B63A0",
          lineWidth: 4,
          data: bands
        },
        {
          name: 'Designations',
          type: 'line',
          color: "#81D8E9",
          lineWidth: 4,
          data: designations
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
