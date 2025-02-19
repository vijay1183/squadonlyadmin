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
            this.API.getApis(`GetPodCastById?PodcastId=${PodcastId}`, false),
            this.API.getApis(`GetPodcastSummayByPodcastId?PodcastId=${PodcastId}`, false),
            this.API.getApis(`GetPodcastViewCountByPodcastIdForGraph?PodcastId=${PodcastId}`, false),
            this.API.getApis(`GetPodcastCommentsAndReplies?PodcastId=${PodcastId}&StartRowIndex=1&PageSize=100`, false)
        ])
            .pipe(map(r => {
                return ({
                    podcasts: r[0],
                    counts: r[1],
                    graph: r[2],
                    comments: r[3],
                    PodcastId
                })
            }))
    }
}