import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ADTSettings } from 'angular-datatables/src/models/settings';
import { Subject, first } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
  providers: [DatePipe]
})
export class PodcastComponent implements OnInit, AfterViewInit {
  public breadcrumbs = [{ title: 'Dashboard', link: '/dashboard' }, { title: 'Podcast', link: '' }];
  public dtOptions: DataTables.Settings = {
    responsive: true,
    autoWidth: false,
    pageLength: 10,
    lengthMenu: [10, 20, 30, 40, 50]
  };
  public columnDefs: any = [
    { "title": "Title", "data": "Title" },
    { "title": "Source", "data": "Source" },
    { "title": "Published Datetime", "data": "PublishedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    { "title": "Created Datetime", "data": "CreatedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    { "title": "Updated Datetime", "data": "UpdatedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    {
      title: 'Action',
      render: (data: any, type: any, full: any) => {
        return `<button type="button" class="btn btn-sm btn-success text-white" data-podcast="${full.PodcastId}">View</button>`;
      }
    }
  ];
  constructor(
    private renderer: Renderer2,
    private ActivateRoute: ActivatedRoute,
    public CF: CommonService,
    private pipeDateInstance: DatePipe
  ) {
  }
  ngOnInit(): void {
    this.ActivateRoute.data
      .pipe(first())
      .subscribe((response: any) => {
        this.bindData(response['service']['podcasts']['data'])
      })
  }
  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("data-podcast")) {
        console.log(event.target.getAttribute("data-podcast"))
      }
    });
  }
  private bindData(response: any) {
    if (response.Code === 200) {
      const runJson: any = response.Data;
      if (runJson.length > 0) {
        this.dtOptions['columns'] = this.columnDefs;
        this.dtOptions['data'] = runJson;
      }
    }
  }
}
