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
import { Designations, DesignationsValues } from 'src/app/constants/constants';
declare var jQuery: any;
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
  isYaxisShow1 = false;
  isYaxisShow0 = true;
  isBandClicked = false;
  isDesignationClicked = false;
  queryParams: any = {};
  legend: LegendBand;
  processedYData: any = [];
  seriesNameConverter: any = {
    Seriesonename: 'Series One Name',
    Seriestwoname: 'Series Two Name',
  };
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
      that.graphDataCustomization(data);
      that.generateBandDesignation(
        that.band,
        that.designation,
        that.startingYear
      );
      (function ($) {
        $(document).ready(function () {
          console.log('Hello from jQuery!');
        });
      })(jQuery);
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
      yAxis: [
        {
          // left y axis
          reversed: true,
          title: {
            text: '',
          },
          visible: true,
          categories: ['5', '5.1', '5.2', '6', '7'],
          labels: {
            useHTML: true,
          },

          showEmpty: false,
          lineWidth: 6,
          gridLineWidth: 0,

          min: 0,
          max: 4,
          zoomEnabled: false,
        },
        {
          // right y axis
          title: {
            text: '',
          },
          zoomEnabled: false,
          reversed: true,
          showEmpty: false,
          visible: false,
          gridLineWidth: 0,
          labels: {
            useHTML: true,
          },

          lineWidth: 6,
          min: 0,
          categories: [
            Designations.AssistantManager,
            Designations.CreditAnalyst,
            Designations.ExecutiveHCMOD,
            Designations.UnitHead,
          ],
          max: 3,
        },
      ],
      xAxis: {
        zoomEnabled: false,
        min: 0,
        max: 8,
        categories: that.years,
        lineWidth: 6,
        labels: {
          useHTML: true,
          style: {},
        },
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
              '<button class="mat-focus-indicator band-btn mat-raised-button mat-button-base btn-width"> <span class="mat-button-wrapper">' +
              this.name +
              '</span></button>'
            );
          } else this.name == 'Designations';
          {
            return (
              '<button class="mat-focus-indicator info-btn mat-raised-button mat-button-base btn-width"> <span class="mat-button-wrapper">' +
              this.name +
              '</span></button>'
            );
          }
        },
      },
      tooltip: {
        pointFormatter: function () {
          var val: any = this.y;
          var name: string = DesignationsValues[val];
          if (this.series.name == 'Bands') {
            return (
              '' +
              '<span style="color:{point.color}">Band : </span>' +
              that.valueRev[val] +
              '<br/>'
            );
          } else this.series.name == 'Designations';
          {
            return (
              '<span style="color:{point.color}">Designation:</span> ' +
              Designations[name as keyof typeof Designations] +
              '<br/>'
            );
          }
        },
      },
      plotOptions: {
        series: {
          events: {
            legendItemClick: function (event) {
              var s = this.chart.series;
              for (var i = 0; i < s.length; i++) {
                if (this.name == 'Show All' || this == s[i]) {
                  that.isBandClicked = !that.isBandClicked;
                  that.isDesignationClicked = false;
                  HighCharts.chart(
                    that.ChartContainer.nativeElement,
                    options
                  ).update({
                    yAxis: [
                      {
                        // left y axis
                        reversed: true,
                        title: {
                          text: '',
                        },
                        visible: true,
                        categories: ['5', '5.1', '5.2', '6', '7'],
                        labels: {
                          useHTML: true,
                        },

                        showEmpty: false,
                        lineWidth: 6,
                        gridLineWidth: 0,

                        min: 0,
                        max: 4,
                        zoomEnabled: false,
                      },
                      {
                        // right y axis
                        title: {
                          text: '',
                        },
                        zoomEnabled: false,
                        reversed: true,
                        showEmpty: false,
                        visible: false,
                        gridLineWidth: 0,
                        labels: {
                          useHTML: true,
                        },

                        lineWidth: 6,
                        min: 0,
                        categories: [
                          Designations.AssistantManager,
                          Designations.CreditAnalyst,
                          Designations.ExecutiveHCMOD,
                          Designations.UnitHead,
                        ],
                        max: 3,
                      },
                    ],
                    series: [
                      {
                        visible: true,
                        name: 'Bands',
                        type: 'line',
                        allowPointSelect: true,
                        color: '#14b5d0',
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
                        yAxis: 0,
                      },
                      {
                        visible: that.isBandClicked == true ? false : true,
                        name: 'Designations',
                        type: 'line',
                        color: '#5a89ff',
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
                        yAxis: 1,
                      },
                    ],
                  });
                } else {
                  that.isDesignationClicked = !that.isDesignationClicked;
                  that.isBandClicked = false;
                  HighCharts.chart(
                    that.ChartContainer.nativeElement,
                    options
                  ).update({
                    yAxis: [
                      {
                        // left y axis
                        reversed: true,
                        title: {
                          text: '',
                        },
                        visible:
                          that.isDesignationClicked == true ? false : true,
                        categories: ['5', '5.1', '5.2', '6', '7'],
                        labels: {
                          useHTML: true,
                        },

                        showEmpty: false,
                        lineWidth: 6,
                        gridLineWidth: 0,

                        min: 0,
                        max: 4,
                        zoomEnabled: false,
                      },
                      {
                        // right y axis
                        title: {
                          text: '',
                        },
                        zoomEnabled: false,
                        reversed: true,
                        showEmpty: false,
                        visible:
                          that.isDesignationClicked == true ? true : false,
                        gridLineWidth: 0,
                        labels: {
                          useHTML: true,
                          formatter: function () {
                            return (
                              '<span class="tamp">' + this.value + '</span>'
                            );
                          },
                        },

                        lineWidth: 6,
                        min: 0,
                        categories: [
                          Designations.AssistantManager,
                          Designations.CreditAnalyst,
                          Designations.ExecutiveHCMOD,
                          Designations.UnitHead,
                        ],
                        max: 3,
                      },
                    ],
                    series: [
                      {
                        visible:
                          that.isDesignationClicked == true ? false : true,
                        name: 'Bands',
                        type: 'line',
                        allowPointSelect: true,
                        color: '#14b5d0',
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
                        yAxis: 0,
                      },
                      {
                        visible: true,
                        name: 'Designations',
                        type: 'line',
                        color: '#5a89ff',
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
                        yAxis: 1,
                      },
                    ],
                  });
                }
              }
              return false;
            },
          },
          label: {
            connectorAllowed: false,
          },
          dataLabels: {
            enabled: false,
          },
          // pointStart: Date.UTC(startYear, 0, 1),
          // pointInterval: (365 * 24 * 3600 * 1000) / 1,
        },
      },
      series: [
        {
          name: 'Bands',
          type: 'line',
          allowPointSelect: true,
          color: '#14b5d0',
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
          yAxis: 0,
        },
        {
          name: 'Designations',
          type: 'line',
          color: '#5a89ff',
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
          yAxis: 1,
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
