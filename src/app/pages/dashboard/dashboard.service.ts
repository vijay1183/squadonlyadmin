import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, map, of } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { WebapiService } from 'src/app/services/webapis.service';
let user: { ADUsername: string };
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(
    private API: WebapiService,
    private CF: CommonService
  ) { }
  resolve(route: ActivatedRouteSnapshot) {
    return of(null)
    // const getUser = localStorage.getItem(this.CF.Token);
    // user = (getUser) ? this.CF.Decrypt(JSON.parse(getUser), this.CF.Token) : null;
    // return forkJoin([
    //   this.API.getApis(`JobRun/JobRunList`, false, false),      
    //   this.API.getApis(`DQ_User_Action/MyFollowups?ADUsername=${user.ADUsername}`, false, false),
    //   this.API.getApis(`DQ_User_Action/MyResolved?ADUsername=${user.ADUsername}`, false, false),
    //   this.API.getApis(`Lookup/SelStatus`, false, false),
    // ]).pipe(map(r => {
    //   return ({
    //     runs: r[0],
    //     MyFollowups: r[1],
    //     MyResolved: r[2],
    //     status:r[3],
    //   })
    // }))
  }
}
