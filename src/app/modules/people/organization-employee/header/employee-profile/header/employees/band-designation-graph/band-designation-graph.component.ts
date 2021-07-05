import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import * as HighCharts from 'highcharts';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { BaseComponentComponent } from 'src/app/shared/base-component/base-component.component';
import { AllServicesService } from 'src/app/services/all-services.service';
import * as Highcharts from 'highcharts';
interface LegendBand {
  color: string;
  name: string;
}

@Component({
  selector: 'anms-band-designation-graph',
  templateUrl: './band-designation-graph.component.html',
  styleUrls: ['./band-designation-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class BandDesignationGraphComponent
  extends BaseComponentComponent
  implements OnInit, AfterViewInit
{
  @ViewChild('chartContainer') ChartContainer: ElementRef;
  data: any = {};
  queryParams: any = {};
  legend: LegendBand;
  processedYData: any = [];
  constructor(
    private httpClient: HttpClient,
    private allServicesService: AllServicesService,
    private route: ActivatedRoute,
    private cdf: ChangeDetectorRef
  ) {
    super();
  }
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
      that.generateBandDesignation(
        that.band,
        that.designation,
        that.startingYear
      );
    });
  }
  generateBandDesignation(bands: any, designations: any, startYear: any) {
    let that = this;
    const options: HighCharts.Options = {
      chart: {
        type: 'line',
        plotBorderWidth: 0,
        zoomType: 'xy',
      },
      credits: {
        enabled: false,
      },
      title: {
        useHTML: true,
        text: 'Band & Designation year wise',
        style: {
          styledMode: true,
        },
      },
      yAxis: {
        reversed: true,
        title: {
          text: '',
        },
        gridLineColor: 'transparent',
        labels: {
          useHTML: true,
          style: {},
        },
        min: 5,
        max: 8,
        tickInterval: 0.5,

        lineWidth: 3,
        startOnTick: false,
        endOnTick: false,
      },
      xAxis: {
        type: 'datetime',

        lineWidth: 3,
        labels: {
          useHTML: true,
          style: {},
        },
        tickInterval: 1000 * 3600 * 24 * 365,
        units: [['year', [1]]],
      },
      legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        useHTML: true,
        labelFormatter: function () {
          if (this.name == 'Bands') {
            return (
              '<button class="mat-focus-indicator designation_btn mat-raised-button mat-button-base btn-width"> <span class="mat-button-wrapper">' +
              this.name +
              '</span></button>'
            );
          } else this.name == 'Designations';
          {
            return (
              '<button class="mat-focus-indicator name_btn mat-raised-button mat-button-base btn-width"> <span class="mat-button-wrapper">' +
              this.name +
              '</span></button>'
            );
          }
        },
      },
      plotOptions: {
        series: {
          events: {
            legendItemClick: function(event) {
                var s = this.chart.series;
                for(var i = 0; i < s.length; i++) {
                    if(this.name == 'Show All' || this == s[i])
                        s[i].setVisible(true);
                    else
                        s[i].setVisible(false);
                }
                return false;
            }
        },
          label: {
            connectorAllowed: false,
          },
          dataLabels: {
            enabled: false,
          },
          pointStart: Date.UTC(startYear, 0, 1),
          pointInterval: (365 * 24 * 3600 * 1000) / 1,
        },
      },
      series: [
        {
          name: 'Bands',
          type: 'line',
          allowPointSelect: true,
          point: {
            events: {
              select: function () {
                var text = this.y + ' was last selected',
                  chart = this.series.chart;
                console.log(text);
              },
            },
          },
          lineWidth: 4,
          data: bands,
        },
        {
          name: 'Designations',
          type: 'line',
          allowPointSelect: true,
          point: {
            events: {
              select: function () {
                var text = this.y + ' was last selected',
                  chart = this.series.chart;
                console.log(text);
              },
            },
          },
          lineWidth: 4,
          data: designations,
        },
      ],

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };

    HighCharts.chart(that.ChartContainer.nativeElement, options);
  }
}
