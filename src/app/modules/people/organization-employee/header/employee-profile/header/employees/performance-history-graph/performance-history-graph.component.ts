import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import * as Highcharts from 'highcharts'; // load core
import HC_more from 'highcharts/highcharts-more'; // load highcharts-more
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { AllServicesService } from 'src/app/services/all-services.service';
HC_more(Highcharts);

interface ExtendedPointOptionsObject extends Highcharts.PointOptionsObject {
  country: string;
}

interface BubbleChart {
  data: Array<any>;
  color: string;
}

@Component({
  selector: 'anms-performance-history-graph',
  templateUrl: './performance-history-graph.component.html',
  styleUrls: ['./performance-history-graph.component.scss'],
})
export class PerformanceHistoryGraphComponent implements OnInit {
  performanceData: any = [];
  chartData: any = [];
  reward: any = [];
  warning: any = [];
  appreciation: any = [];
  queryParams: any = {};
  performance: any = [];
  appreciationData: any = [];
  rewardsData: any = [];
  warningData: any = [];
  trainingData: any = [];
  yAxisCatogories: any = [];
  legendLabels: any = [];
  setVisibleBubble = false;

  training: any = [];
  @ViewChild('bubbleChartContainer') bubbleChartContainer: ElementRef;
  data: any = [];
  constructor(
    private httpClient: HttpClient,
    private allServicesService: AllServicesService,
    private route: ActivatedRoute
  ) {}
  ngOnInit() {
    let that = this;
    this.queryParams = this.route.snapshot.queryParams;
  }

  ngAfterViewInit() {
    let that = this;
    that.allServicesService.getPerformance().subscribe((data) => {
      that.performanceData = (data as any).data;
      that.yAxisCatogories = that.performanceData.roles;
      that.legendLabels = that.performanceData.pref_types;
      const performance_year = Object.keys(
        that.performanceData.performance_history
      );
      const performance_data: any = Object.values(
        that.performanceData.performance_history
      );
      performance_data.map((result: any, index: any) => {
        var data = result[0].employee_pref_record_history;
        for (var k = 0; k < data.length; k++) {
          if (data[k].pref_type == 'appreciation') {
            if (this.appreciationData.length > 0) {
              var newdata = this.loadPerformanceData(
                data,
                data[k].pref_type,
                performance_year[index]
              );
              this.appreciationData[0].data =
                this.appreciationData[0].data.concat(newdata);
            } else {
              this.appreciationData.push({
                name: data[k].pref_type,
                type: 'bubble',
                data: this.loadPerformanceData(
                  data,
                  data[k].pref_type,
                  performance_year[index]
                ),
              });
            }
          } else if (data[k].pref_type == 'rewards') {
            if (this.rewardsData.length > 0) {
              var newdata = this.loadPerformanceData(
                data,
                data[k].pref_type,
                performance_year[index]
              );
              this.rewardsData[0].data =
                this.rewardsData[0].data.concat(newdata);
            } else {
              this.rewardsData.push({
                name: data[k].pref_type,
                type: 'bubble',
                data: this.loadPerformanceData(
                  data,
                  data[k].pref_type,
                  performance_year[index]
                ),
              });
            }
          } else if (data[k].pref_type == 'warning') {
            if (this.warningData.length > 0) {
              var newdata = this.loadPerformanceData(
                data,
                data[k].pref_type,
                performance_year[index]
              );
              this.warningData[0].data =
                this.warningData[0].data.concat(newdata);
            } else {
              this.warningData.push({
                name: data[k].pref_type,
                type: 'bubble',
                data: this.loadPerformanceData(
                  data,
                  data[k].pref_type,
                  performance_year[index]
                ),
              });
            }
          } else if (data[k].pref_type == 'training') {
            if (this.trainingData.length > 0) {
              var newdata = this.loadPerformanceData(
                data,
                data[k].pref_type,
                performance_year[index]
              );
              this.trainingData[0].data =
                this.trainingData[0].data.concat(newdata);
            } else {
              this.trainingData.push({
                name: data[k].pref_type,
                type: 'bubble',
                data: this.loadPerformanceData(
                  data,
                  data[k].pref_type,
                  performance_year[index]
                ),
              });
            }
          }
        }
      });
      if (performance_data.length > 0) {
        that.generatePerformance(
          this.rewardsData[0].data,
          this.appreciationData[0].data,
          this.warningData[0].data,
          this.trainingData[0].data
        );
      } else {
        var emp_rewards: any = [];
        var emp_appreciation: any = [];
        var emp_warning: any = [];
        var emp_training: any = [];
        that.generatePerformance(
          emp_rewards,
          emp_appreciation,
          emp_warning,
          emp_training
        );
      }

      // that.data1 = data.filter((x: any) => x.employeeId == this.queryParams.employeeId);
    });
  }

  groupBy(list: any, keyGetter: any) {
    const map = new Map();
    list.forEach((item: any) => {
      const key = keyGetter(item);
      const collection = map.get(key);
      if (!collection) {
        map.set(key, [item]);
      } else {
        collection.push(item);
      }
    });
    return map;
  }

  loadPerformanceData(pData: any[], pref_type: string, year: any) {
    let that = this;
    var data = [];
    for (var j = 0; j < pData.length; j++) {
      if (pData[j].pref_type == pref_type) {
        data.push({
          x: parseInt(year),
          y:
            pData[j].pref_level == 'hr'
              ? 1
              : pData[j].pref_level == 'lm'
              ? 0
              : pData[j].pref_level == 'employee'
              ? 3
              : 2,
          z:
            pData[j].pref_size == 'min'
              ? 20
              : pData[j].pref_size == 'mid'
              ? 35
              : 90,
          name: this.medals(pData[j].pref_type),
        });
      }
    }

    return data;
  }

  medals(pref_type: string) {
    let that = this;
    switch (pref_type) {
      case 'rewards':
        return 'R';
      case 'appreciation':
        return 'A';
      case 'warning':
        return 'W';
      case 'training':
        return 'T';
      default:
        return '';
    }
  }

  medalsReverse(key: string) {
    let that = this;
    switch (key) {
      case 'R':
        return 'Performance Reward';
      case 'A':
        return 'Letter of Appreciation';
      case 'W':
        return 'Warning';
      case 'T':
        return 'Training';
      default:
        return '';
    }
  }

  generatePerformance(
    rewards: any,
    appreciation: any,
    warning: any,
    training: any
  ) {
    let that = this;
    const options: Highcharts.Options = {
      chart: {
        animation: false,
        backgroundColor: '#FAFAFB',
        type: 'bubble',
        plotBorderWidth: 0,
        zoomType: 'xy',
      },
      credits: {
        enabled: false,
      },
      legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        useHTML: true,
        labelFormatter: function () {
          switch (this.name) {
            case that.legendLabels[0]:
              return (
                '<button class="mat-focus-indicator success-btn mat-raised-button mat-button-base btn-width mb-10"> <span class="mat-button-wrapper">' +
                this.name +
                '</span></button>'
              );
            case that.legendLabels[1]:
              return (
                '<button class="mat-focus-indicator warning-btn mat-raised-button mat-button-base btn-width mb-10"> <span class="mat-button-wrapper">' +
                this.name +
                '</span></button>'
              );
            case that.legendLabels[2]:
              return (
                '<button class="mat-focus-indicator danger-btn mat-raised-button mat-button-base btn-width mb-10"> <span class="mat-button-wrapper">' +
                this.name +
                '</span></button>'
              );
            case that.legendLabels[3]:
              return (
                '<button class="mat-focus-indicator info-btn mat-raised-button mat-button-base btn-width mb-10"> <span class="mat-button-wrapper">' +
                this.name +
                '</span></button>'
              );
            default:
              return '';
          }
        },
      },

      title: {
        useHTML: true,
        text: 'Performance History',
        style: {
          color: '#45C23D',
          // 'background-color': '#9BE997',
          // 'padding': '28px 333px 10px 250px',
          fontWeight: 'bold',
        },
      },

      accessibility: {
        point: {
          valueDescriptionFormat:
            '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.',
        },
      },

      xAxis: {
        zoomEnabled: false,
        labels: {
          useHTML: true,
        },

        lineWidth: 3,
        min: 2012,
        max: 2020,
        categories: [
          '2012',
          '2013',
          '2014',
          '2015',
          '2016',
          '2017',
          '2018',
          '2019',
          '2020',
        ],
        gridLineWidth: 0,
        title: {
          text: '',
        },
        accessibility: {
          rangeDescription: 'Range: 60 to 100 grams.',
        },
      },

      yAxis: {
        zoomEnabled: false,
        labels: {
          useHTML: true,
        },
        min: 0,
        categories: that.yAxisCatogories,
        max: 3,
        gridLineWidth: 0,
        startOnTick: false,
        endOnTick: false,
        lineColor: '#40A6DC',
        lineWidth: 3,
        title: {
          text: '',
        },
        accessibility: {
          rangeDescription: 'Range: 0 to 160 grams.',
        },
      },
      tooltip: {
        shared: true,
        useHTML: true,
        formatter: function () {
          var key: any = this.key;
          return `
          <tr>${this.x}</td></tr><br />
          <tr><td>${that.medalsReverse(key)} by ${
            this.y == 0
              ? 'LM'
              : this.y == 1
              ? 'HR'
              : this.y == 2
              ? 'Managment'
              : 'Employee'
          } </td></tr></table>`;
        },
      },

      plotOptions: {
        bubble: {
          minSize: '20px',
          maxSize: '40px',
        },
        series: {
          events: {
            legendItemClick: function (event) {
              var s = this.chart.series;
              that.setVisibleBubble = !that.setVisibleBubble;
              for (var i = 0; i < s.length; i++) {
                if (this.name == 'Show All' || this == s[i]) {
                  s[i].setVisible(true);
                } else {
                  if (that.setVisibleBubble == false) {
                    s[i].setVisible(true);
                  } else {
                    s[i].setVisible(false);
                  }
                }
              }
              return false;
            },
          },
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      },
      series: [
        {
          animation: false,
          type: 'bubble',
          name: that.legendLabels[0],
          data: rewards,
          color: 'rgb(0 166 81)',
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
        },
        {
          type: 'bubble',
          name: that.legendLabels[1],
          data: appreciation,
          color: 'rgb(237 187 7)',
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
        },
        {
          type: 'bubble',
          name: that.legendLabels[2],
          data: warning,
          color: 'rgb(254 95 45)',
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
        },
        {
          type: 'bubble',
          name: that.legendLabels[3],
          data: training,
          color: 'rgb(90 137 255)',
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
        },
        {
          type: 'bubble',
          name: 'Show All',
        },
      ],
    };
    Highcharts.chart(that.bubbleChartContainer.nativeElement, options);
  }
}
