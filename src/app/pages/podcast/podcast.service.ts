import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { forkJoin, map } from "rxjs";
import { WebapiService } from "src/app/services/webapis.service";

@Injectable({
    providedIn: 'root'
})
export class PodcastService {
    constructor(
        private API: WebapiService
    ) { }
    resolve(route: ActivatedRouteSnapshot) {
        return forkJoin([
            this.API.getApis(`GetPodCasts?StartRowIndex=0&PageSize=100`, false)
        ])
            .pipe(map(r => {
                return ({
                    podcasts: r[0]
                })
            }))
    }
}