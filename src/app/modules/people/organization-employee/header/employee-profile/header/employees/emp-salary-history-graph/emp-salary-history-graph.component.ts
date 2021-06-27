import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';
import * as HighCharts from 'highcharts';
import { SalaryChangeHistoryGraphService } from '../../../../../../../../services/salary-change-history-graph.service';
import { ActivatedRoute } from '@angular/router';
import { BaseComponentComponent } from 'src/app/shared/base-component/base-component.component';

@Component({
  selector: 'anms-emp-salary-history-graph',
  templateUrl: './emp-salary-history-graph.component.html',
  styleUrls: ['./emp-salary-history-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default

})
export class EmpSalaryHistoryGraphComponent extends BaseComponentComponent implements OnInit {
  @ViewChild('chartContainer') ChartContainer: ElementRef;
  data: any = {};
  queryParams: any = {};
  constructor(
    private lineChartService: SalaryChangeHistoryGraphService,
    private route: ActivatedRoute
  ) { super(); }
  ngOnInit() {
    let that = this;
  }
  ngAfterViewInit() {
    this.queryParams = this.route.snapshot.queryParams;

    let that = this;
    this.lineChartService.getGraph().subscribe((data) => {
      var data = (data as any).data;
      var employeSalary = data.find(
        (x: any) => x.employeeId == that.queryParams.employeeId
      );
      that.graphDataCustomization(employeSalary);
      that.generateSalary(that.salary, that.startingYear);
    });
  }
  generateSalary(data: any, startYear: any) {
    let that = this;
    const options: HighCharts.Options = {
      chart: {
        backgroundColor: '#F2F3F4',
        type: 'line',
        plotBorderWidth: 0,
        zoomType: 'xy'
      },
      title: {
        useHTML: true,
        text: 'Salary Change Histroy',
        style: {
          color: '#0B94DE',
          // 'background-color': '#9BE997',
          // 'padding': '28px 333px 10px 250px',
          fontWeight: 'bold'
        }
      },
      credits: {
        enabled: false
      },
      yAxis: {
        min: 10000,
        max: 100000,
        tickInterval: 10000,
        gridLineWidth: 0,
        startOnTick: false,
        endOnTick: false,
        lineColor: '#40A6DC',
        lineWidth: 3,
        title: {
          text: ''
        },
        labels: {
          format: '{value:.0f}',
          useHTML: true,
          style: {
            color: '#3498DB',
            'background-color': 'white',
            'padding': '4px',
            'box-shadow': '0px 1px',
            'font-weight': 'bold'
          }
        },
        maxPadding: 0.2
      },
      xAxis: {
        type: 'datetime',
        tickInterval: 1000 * 3600 * 24 * 365,
        units: [['year', [1]]],
        lineColor: '#40A6DC',
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
          pointStart: Date.UTC(startYear, 0, 1),
          pointInterval: (365 * 24 * 3600 * 1000) / 1
        }
      },
      series: [
        {
          name: 'Salary',
          type: 'line',
          data: data,
          color: "#51AE69",
          lineWidth: 4,
          showInLegend: false
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
