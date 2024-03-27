import { AfterViewInit, Component, HostListener, Inject, Input, LOCALE_ID } from '@angular/core';
import * as c3 from 'c3';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements AfterViewInit {
  public uniqueChartID = 'chart' + Math.floor(Math.random() * (100 - 1 + 1) + 1);
  @Input() type: c3.ChartType = 'area-spline';
  @Input() data: any;
  private chart: any;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
  ) {
  }
  private timer: any;
  private clearTimer: any;
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.clearTimer) {
      clearTimeout(this.clearTimer)
    }
    this.clearTimer = setTimeout(() => this.chart.resize(), 100);
  }
  ngAfterViewInit() {
    this.timer = setInterval(() => {
      const div = document.getElementById(this.uniqueChartID);
      if (!div) {
        return
      }
      clearInterval(this.timer)
      this.generateGraph(this.data, this.uniqueChartID)
    }, 500)
  }
  private generateGraph(graphPoints: any, uniqueChartID: string) {
    const Dates = ['x'];
    const Data = ['Views'];
    graphPoints
      // .slice(Math.max(graphPoints.length - 5, 0))
      .forEach((ele: any) => {
        Dates.push(this.transformDate(ele['Date'], 'yyyy-MM-dd'));
        Data.push(ele['ViewCount']);
      });
    const columns: any = [Dates, Data];
    this.chart = c3.generate({
      size: { height: 300 },
      bindto: "#" + uniqueChartID,
      zoom: { enabled: true },
      legend: { show: false, position: 'bottom' },
      point: { r: 4, show: true, sensitivity: 0 },
      spline: { interpolation: { type: 'linear' } },
      grid: { x: { show: false }, y: { show: false } },
      resize: { auto: true },
      data: {
        x: 'x',
        // xFormat: '%Y-%m-%d %H:%M:%S',
        columns,
        type: this.type
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: "%b %d"
          }
        }
      },
      color: {
        pattern: ['#1f77b4', '#aec7e8', '#ff7f0e', '#ffbb78', '#2ca02c', '#98df8a', '#d62728', '#ff9896', '#9467bd', '#c5b0d5', '#8c564b', '#c49c94', '#e377c2', '#f7b6d2', '#7f7f7f', '#c7c7c7', '#bcbd22', '#dbdb8d', '#17becf', '#9edae5']
      }
    });
  }
  private transformDate(date: any, format: string) {
    return formatDate(new Date(date), format, this.locale)
  }
}