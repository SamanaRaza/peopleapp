import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import * as Highcharts from 'highcharts'; // load core
import HC_more from 'highcharts/highcharts-more'; // load highcharts-more
import { HttpClient } from "@angular/common/http";
import { PerformanceHistoryService } from "../../../../../../../../services/performance-history.service";
import { ActivatedRoute } from '@angular/router';
HC_more(Highcharts);
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
      console.log('bubb',this.data1)
      // that.data1 = data.filter((x: any) => x.employeeId == this.queryParams.employeeId);
     that.generatePie(that.data1[0].employee_performance);
    });
  }

  generatePie(data: any) {
    let that = this;
    const options: Highcharts.Options = {
      chart: {
        type: 'bubble',
        plotBorderWidth: 1,
        zoomType: 'xy'
      },

      legend: {
        enabled: true
      },

      title: {
        text: 'Performance History'
      },

      subtitle: {
        text: 'Source: <a href="http://www.euromonitor.com/">Euromonitor</a> and <a href="https://data.oecd.org/">OECD</a>'
      },
      accessibility: {
        point: {
          valueDescriptionFormat: '{index}. {point.name}, fat: {point.x}g, sugar: {point.y}g, obesity: {point.z}%.'
        }
      },

      xAxis: {
        type: 'datetime',
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
        categories: ['LM', 'HR', 'Managment'],
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
        headerFormat: '<table>',
        pointFormat: '<tr><th colspan="2"><h3>{point.country}</h3></th></tr>' +
          '<tr><th>Fat intake:</th><td>{point.x}g</td></tr>' +
          '<tr><th>Sugar intake:</th><td>{point.y}g</td></tr>' +
          '<tr><th>Obesity (adults):</th><td>{point.z}%</td></tr>',

        footerFormat: '</table>',
        followPointer: true
      },

      plotOptions: {
        series: {

          dataLabels: {
            enabled: true,
            format: '{point.name}'
          },

        }
      },
      series: data
    };
    Highcharts.chart(that.bubbleChartContainer.nativeElement, options);
  }


}
