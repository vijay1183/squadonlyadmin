import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, map, of } from 'rxjs';
import { WebapiService } from 'src/app/services/webapis.service';
let user: { ADUsername: string };
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private API: WebapiService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    return forkJoin([
      this.API.getApis(`GetDataForCards`, false),
      this.API.getApis(`GetPodcastViewCountForGraph`, false),

      this.API.getApis(`GetPodcastDetailsForDashboard?StartRowIndex=1&PageSize=10`, false),
      this.API.getApis(`GetUserDetailsForDashboard?StartRowIndex=1&PageSize=10`, false),
    ])
      .pipe(map(r => {
        return ({
          dashboard: r[0],
          graph: r[1],
          podCast:r[2],
          users:r[3]
        })
      }))
  }
}
