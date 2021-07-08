import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import * as HighCharts from 'highcharts';
import { ActivatedRoute } from '@angular/router';
import { BaseComponentComponent } from 'src/app/shared/base-component/base-component.component';
import { AllServicesService } from 'src/app/services/all-services.service';

@Component({
  selector: 'anms-emp-salary-history-graph',
  templateUrl: './emp-salary-history-graph.component.html',
  styleUrls: ['./emp-salary-history-graph.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class EmpSalaryHistoryGraphComponent
  extends BaseComponentComponent
  implements OnInit {
  @ViewChild('chartContainer') ChartContainer: ElementRef;
  data: any = {};
  queryParams: any = {};
  constructor(
    private allServicesService: AllServicesService,
    private route: ActivatedRoute
  ) {
    super();
  }
  ngOnInit() {
    let that = this;
    this.queryParams = this.route.snapshot.queryParams;

    this.allServicesService.getSalaryGraph().subscribe((data) => {
      var data = (data as any).data;
      that.graphDataCustomization(null, data.salary_history);
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
        zoomType: 'xy',
      },
      title: {
        useHTML: true,
        text: 'Salary Change History',
        style: {
          color: '#0B94DE',
          // 'background-color': '#9BE997',
          // 'padding': '28px 333px 10px 250px',
          fontWeight: 'bold',
        },
      },
      credits: {
        enabled: false,
      },
      yAxis: {
        zoomEnabled: false,
        min: 10000,
        max: 100000,
        tickInterval: 10000,
        startOnTick: false,
        endOnTick: false,
        title: {
          text: '',
        },
        labels: {
          format: '{value:.0f}',
          useHTML: true,
        },
        maxPadding: 0.2,
      },
      xAxis: {
        zoomEnabled: false,
        min: 0,
        max: 8,
        lineWidth : 3,
        categories: that.years,
        labels: {
          useHTML: true,
        },
      },
      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },
      series: [
        {
          name: 'Salary',
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
          data: data,
          color: '#51AE69',
          lineWidth: 4,
          showInLegend: false,
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
