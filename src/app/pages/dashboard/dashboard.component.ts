import { Component, HostListener, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import * as c3 from 'c3';
import { formatDate } from '@angular/common';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public breadcrumbs = [{ title: 'Dashboard', link: '/' }];
  public dashList = [
    { name: "Total Podcasts", count: 0, bg: 'bg-secondary', image_icon: 'podcast' },
    { name: "Total Users", count: 0, bg: 'bg-info', image_icon: 'group' },
    { name: "Pending Activation", count: 0, bg: 'bg-danger', image_icon: 'dashboard' }
  ]
  public topPodCasts: any = [];
  public topUsers: any = [];
  public dtOptions = {
    ordering: true,
    dom: 'f',
    responsive: true
  };
  private getScreen: { width: number; height: number; } = { width: 400, height: 100 };
  chart: any;
  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private ActivateRoute: ActivatedRoute,
    public CF: CommonService
  ) {
  }
  ngOnInit(): void {
    this.getScreen = { width: window.innerWidth, height: window.innerHeight };
    this.ActivateRoute.data
      .pipe(first())
      .subscribe((response: any) => {
        const { TotalPodcasts, TotalUsers, UserPendingActivation } = response['service']['dashboard']['data']['Data'];
        this.dashList = [
          { name: "Total Podcasts", count: TotalPodcasts, bg: 'bg-secondary', image_icon: 'podcast' },
          { name: "Total Users", count: TotalUsers, bg: 'bg-info', image_icon: 'group' },
          { name: "Pending Activation", count: UserPendingActivation, bg: 'bg-danger', image_icon: 'dashboard' }
        ]
        const graphPoints = response['service']['graph']['data']['Data'];
        this.generateGraph(graphPoints);

        this.topPodCasts = response['service']['podCast']['data']['Data'];
        this.topUsers = response['service']['users']['data']['Data'];

      })
  }
  private clearTimer: any;
  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    this.getScreen = { width: window.innerWidth, height: window.innerHeight };
    if (this.clearTimer) {
      clearTimeout(this.clearTimer)
    }
    this.clearTimer = setTimeout(() => {
      this.chart.resize()
    }, 100);

  }


  private generateGraph(graphPoints: any) {
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
      bindto: '#chart',
      zoom: { enabled: true },
      legend: { show: false, position: 'bottom' },
      point: { r: 4, show: true, sensitivity: 0 },
      spline: { interpolation: { type: 'linear' } },
      grid: { x: { show: false }, y: { show: false } },
      resize: { auto: true },
      size: { width: ((this.getScreen.width > 400) ? this.getScreen.width - 400 : this.getScreen.width - 100) },
      data: {
        x: 'x',
        // xFormat: '%Y-%m-%d %H:%M:%S',
        columns,
        type: 'area-spline'
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
