import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot } from "@angular/router";
import { forkJoin, map } from "rxjs";
import { WebapiService } from "src/app/services/webapis.service";
@Injectable({
    providedIn: 'root'
})
export class PodcastDetailsService {
    constructor(
        private API: WebapiService
    ) { }
    resolve(route: ActivatedRouteSnapshot) {
        const PodcastId = route.params['id'];
        return forkJoin([
            this.API.getApis(`GetPodCastById?PodcastId=${PodcastId}`, false)
        ])
            .pipe(map(r => {
                return ({
                    podcasts: r[0]
                })
            }))
    }
}