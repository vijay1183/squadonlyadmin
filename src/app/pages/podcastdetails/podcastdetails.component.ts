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
