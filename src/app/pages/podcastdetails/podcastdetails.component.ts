import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { first } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
export interface posts {
  PodcastId: number
  Title: string
  ThumbnailImageName: string
  Description: string
  PodcastURL: string
  playing: boolean
}
@Component({
  selector: 'app-podcastdetails',
  templateUrl: './podcastdetails.component.html',
  styleUrls: ['./podcastdetails.component.scss']
})
export class PodcastdetailsComponent implements OnInit {
  public breadcrumbs = [{ title: 'Dashboard', link: '/dashboard' }, { title: 'Podcast', link: '/podcast' }];
  public podCast: any = null;
  public selectedPodcastURL: string | undefined;
  private cleartimer: any;
  public dashList = [
    // { name: "Total Views", count: 0, bg: 'bg-secondary', image_icon: 'podcast' },
    // { name: "Comments", count: 0, bg: 'bg-info', image_icon: 'group' },
    // { name: "Total Likes", count: 0, bg: 'bg-danger', image_icon: 'dashboard' },
    // { name: "Users", count: 0, bg: 'bg-success', image_icon: 'category' }
    { name: "Total Views", count: 0, bg: 'bg-primary', image_icon: 'podcast' },
    { name: "Comments", count: 0, bg: 'bg-primary', image_icon: 'group' },
    { name: "Total Likes", count: 0, bg: 'bg-primary', image_icon: 'dashboard' },
    { name: "Users", count: 0, bg: 'bg-primary', image_icon: 'category' }
  ]
  public graphPoints: any;
  public comments: any;
  constructor(
    private ActivateRoute: ActivatedRoute,
    public CF: CommonService
  ) { }
  ngOnInit(): void {
    this.ActivateRoute.data
      .pipe(first())
      .subscribe((response: any) => {
        if (!response['service']['podcasts']['status']) {
          return this.CF.GotoURL('/podcast');
        }
        this.podCast = response['service']['podcasts']['data']['Data'];
        this.breadcrumbs.push({ title: this.podCast['Title'], link: '' });
        const { TotalViews, TotalLikes, TotalComments, TotalCommentedUsers } = response['service']['counts']['data']['Data'];
        this.dashList = [
          { name: "Total Views", count: TotalViews, bg: 'bg-primary', image_icon: 'podcast' },
          { name: "Comments", count: TotalLikes, bg: 'bg-primary', image_icon: 'group' },
          { name: "Total Likes", count: TotalComments, bg: 'bg-primary', image_icon: 'dashboard' },
          { name: "Users", count: TotalCommentedUsers, bg: 'bg-primary', image_icon: 'category' }
        ]
        this.graphPoints = response['service']['graph']['data']['Data'];
        this.comments = response['service']['comments']['data']['Data'];
      })
  }
  public playPodCast(data: posts) {
    data.playing = (data?.playing) ? false : true;
    this.selectedPodcastURL = undefined;
    if (this.cleartimer) {
      clearTimeout(this.cleartimer)
    }
    if (data.playing) {
      this.cleartimer = setTimeout(() => this.selectedPodcastURL = data.PodcastURL, 100);
    }
  }
}
