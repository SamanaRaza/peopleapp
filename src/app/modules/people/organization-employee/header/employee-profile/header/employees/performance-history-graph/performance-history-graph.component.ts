import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts'; // load core
import HC_more from 'highcharts/highcharts-more'; // load highcharts-more
import { HttpClient } from "@angular/common/http";
import { PerformanceHistoryService } from "../../../../../../../../services/performance-history.service";
import { ActivatedRoute } from '@angular/router';
HC_more(Highcharts);

interface ExtendedPointOptionsObject extends Highcharts.PointOptionsObject {
  country: string;
}

interface BubbleChart {
  data: Array<any>;
  color: string

}

@Component({
  selector: 'anms-performance-history-graph',
  templateUrl: './performance-history-graph.component.html',
  styleUrls: ['./performance-history-graph.component.scss']
})
export class PerformanceHistoryGraphComponent implements OnInit {

  data1: any = [];
  chartData: any = [];
  reward: any = [];
  warning: any = [];
  appriciation: any = [];
  queryParams: any = {};
  performance: any = [];
  fullData: any = [];

  training: any = [];
  @ViewChild('bubbleChartContainer') bubbleChartContainer: ElementRef;
  data: any = [];
  constructor(private httpClient: HttpClient, private performanceHistoryService: PerformanceHistoryService, private route: ActivatedRoute) { }
  ngOnInit() {
    let that = this;
    this.queryParams = this.route.snapshot.queryParams;
  }

  ngAfterViewInit() {
    let that = this;
    that.performanceHistoryService.getBubble().subscribe(data => {
      that.data1 = (data as any).data;
      const grouped = this.groupBy(that.data1, (d: any) => d.pref_type);

      for (var entry of grouped.entries()) {
        this.fullData.push({
          name: entry[0],
          type: 'bubble',
          data: this.loadPerformanceData(entry[1], entry[0])
        })
      }
      var data5: BubbleChart = { data: this.fullData[0].data, color: this.fullData[0].data[0].color }
      var data6: BubbleChart = { data: this.fullData[1].data, color: this.fullData[1].data[0].color }
      var data7: BubbleChart = { data: this.fullData[2].data, color: this.fullData[2].data[0].color }
      var data8: BubbleChart = { data: this.fullData[3].data, color: this.fullData[3].data[0].color }
      that.generatePie(data5, data6, data7, data8);

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

  loadPerformanceData(pData: any[], pref_type: string) {
    let that = this;
    var data = [];
    for (var j = 0; j < pData.length; j++) {
      if (pData[j].pref_type == pref_type) {
        data.push({
          x: parseInt(pData[j].year),
          y: pData[j].pref_given_user_name == 'hr' ? 1 : pData[j].pref_given_user_name == 'lm' ? 0 : 2,
          z: pData[j].pref_level == 'min' ? 40 : pData[j].pref_level == 'mid' ? 65 : 80,
          name: this.medals(pData[j].pref_type),
          color: pData[j].color
        });
      }
    }

    return data;
  }

  medals(pref_type: string) {
    let that = this;
    switch (pref_type) {
      case 'pref_rewards':
        return 'R'
      case 'pref_appericiation':
        return 'A'
      case 'pref_warning':
        return 'W'
      case 'pref_training':
        return 'T'
      default:
        return '';
    }
  }

  generatePie(data5: BubbleChart, data6: BubbleChart, data7: BubbleChart, data8: BubbleChart) {
    let that = this;
    const options: Highcharts.Options = {
      chart: {
        backgroundColor: '#F2F3F4',
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },
      credits: {
        enabled: false
      },
      legend: {
        symbolPadding: 0,
        symbolWidth: 0,
        symbolHeight: 0,
        squareSymbol: false,
        useHTML: true,
        labelFormatter: function () {
          return '<span  style="background: ' + this.options.color + ' ;color: white;padding: 20px 20px;font-size:13px;font-weight: bold">' + this.name + '</span>'
        }
      },

      title: {
        useHTML: true,
        text: 'Performance History',
        style: {
          color: '#45C23D',
          // 'background-color': '#9BE997',
          // 'padding': '28px 333px 10px 250px',
          fontWeight: 'bold'
        }
      },

      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
        }
      },

      xAxis: {
        type: 'datetime',
        labels: {
          useHTML: true,
          style: {
            'background-color': '#DAD7C4',
            'box-shadow': '3px 3px',
            'padding': '5px'
          }
        },
        categories: ['2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020'],
        gridLineWidth: 0,
        title: {
          text: ''
        },
        accessibility: {
          rangeDescription: 'Range: 60 to 100 grams.'
        }
      },

      yAxis: {
        labels: {
          useHTML: true,
          style: {
            'background-color': '#DAD7C4',
            'box-shadow': '3px 3px',
            'padding': '5px'
          }
        },
        categories: ['LM', 'HR', 'Managment', 'Employee'],
        gridLineWidth: 0,
        startOnTick: false,
        endOnTick: false,
        title: {
          text: ''
        },
        maxPadding: 0.2,
        accessibility: {
          rangeDescription: 'Range: 0 to 160 grams.'
        }
      },
      tooltip: {
        useHTML: true,
        formatter: function () {
          return `
          <tr><th>Year</th><td> ${this.x}</td></tr><br />
          <tr><th>Role:</th><td> ${this.y == 0 ? "LM" : this.y == 1 ? "HR" : "Managment"}</td></tr><br />
          <tr><th>Performance: </th><td>${this.color}</td></tr></table>`;
        }
      },

      plotOptions: {
        bubble: {
          minSize: 3,
          maxSize: 50
        },
        series: {

          dataLabels: {
            enabled: true,
            format: '{point.name}'
          },

        }
      },
      series: [
        {
          type: "bubble",
          name: "Performance Rewards",
          data: data5.data,
          color: data5.color
        },
        {
          type: "bubble",
          name: "Letter of Appreciation",
          data: data6.data,
          color: data6.color
        },
        {
          type: "bubble",
          name: "Warning Letter",
          data: data7.data,
          color: data7.color
        },
        {
          type: "bubble",
          name: "Training",
          data: data8.data,
          color: data8.color
        },
        {
          type: "bubble", name: '', data: [{ x: 2012, y: 3, z: 0 }], showInLegend: false, color: '#DAD7C4', enableMouseTracking: false
        },
        {
          type: "bubble", name: '', data: [{ x: 2012, y: 2, z: 0 }], showInLegend: false, color: '#DAD7C4', enableMouseTracking: false
        },
        {
          type: "bubble", name: '', data: [{ x: 2012, y: 1, z: 0 }], showInLegend: false, color: '#DAD7C4', enableMouseTracking: false
        },
        {
          type: "bubble", name: '', data: [{ x: 2012, y: 0, z: 0, name: '' }], showInLegend: false, color: '#DAD7C4', enableMouseTracking: false
        },
        {
          type: "bubble", name: '', data: [{ x: 2020, y: 0, z: 0 }], showInLegend: false, color: '#FFFFFF', enableMouseTracking: false
        },
      ]
    };
    Highcharts.chart(that.bubbleChartContainer.nativeElement, options);
  }


}
