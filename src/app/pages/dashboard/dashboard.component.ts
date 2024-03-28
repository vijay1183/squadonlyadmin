import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
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
  public dtOptions = { ordering: false, dom: 'f', responsive: true };
  public graphPoints: any;
  constructor(
    private ActivateRoute: ActivatedRoute,
    public CF: CommonService
  ) {
  }
  ngOnInit(): void {
    this.ActivateRoute.data
      .pipe(first())
      .subscribe((response: any) => {
        const { TotalPodcasts, TotalUsers, UserPendingActivation } = response['service']['dashboard']['data']['Data'];
        this.dashList = [
          { name: "Total Podcasts", count: TotalPodcasts, bg: 'bg-secondary', image_icon: 'podcast' },
          { name: "Total Users", count: TotalUsers, bg: 'bg-info', image_icon: 'group' },
          { name: "Pending Activation", count: UserPendingActivation, bg: 'bg-danger', image_icon: 'dashboard' }
        ]
        this.graphPoints = response['service']['graph']['data']['Data'];
        this.topPodCasts = response['service']['podCast']['data']['Data'];
        this.topUsers = response['service']['users']['data']['Data'];
      })
  }
}
