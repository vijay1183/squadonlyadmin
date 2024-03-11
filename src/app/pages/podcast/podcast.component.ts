import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { WebapiService } from 'src/app/services/webapis.service';
@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
  providers: [DatePipe]
})
export class PodcastComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective;
  public breadcrumbs = [{ title: 'Dashboard', link: '/dashboard' }, { title: 'Podcast', link: '' }];
  private columnDefs = [
    { "title": "Title", "data": "Title" },
    { "title": "Source", "data": "Source" },
    { "title": "Published Datetime", "data": "PublishedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    { "title": "Created Datetime", "data": "CreatedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    { "title": "Updated Datetime", "data": "UpdatedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    {
      title: 'Action',
      render: (data: any, type: any, full: any) => {
        return `<button type="button" class="btn btn-sm btn-success text-white" data-podcast="${full.PodcastId}">Details</button>`;
      }
    }
  ];
  public dtOptions: DataTables.Settings = {
    pagingType: 'simple_numbers',
    autoWidth: false,
    searching: true,
    lengthMenu: [10, 20, 30, 40, 50],
    pageLength: 10,
    serverSide: true,
    processing: true,
    columns: this.columnDefs
  };
  private apiSubcription: Subscription | undefined;
  public showTable: boolean = false;
  public triggerTable: boolean = false;
  constructor(
    private API: WebapiService,
    private renderer: Renderer2,
    private pipeDateInstance: DatePipe
  ) { }
  ngOnInit(): void {
    this.dataTableAngular();
  }
  private dataTableAngular() {
    this.triggerTable = false;
    const that = this;
    this.dtOptions['ajax'] = (dataTablesParameters: any, callback) => {
      const typedValue = dataTablesParameters['search']['value'];
      // this.showTable = (dataTablesParameters['start'] !== 0 && typedValue.length !== 0);
      if (that.apiSubcription) {
        that.apiSubcription.unsubscribe();
      }
      that.apiSubcription = that.API.getAPI(`GetPodCasts?SearchValue=${typedValue}&StartRowIndex=${(dataTablesParameters['start'] / dataTablesParameters['length']) + 1}&PageSize=${dataTablesParameters['length']}`)
        .subscribe((resp: any) => {
          callback({
            recordsTotal: resp.TotalCount,
            recordsFiltered: resp.TotalCount,
            data: resp.Data
          });
          this.showTable = true;
        },
          error => {
            alert('Something went wrong');
          }
        );
    }
  }
  ngAfterViewInit(): void {
    this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("data-podcast")) {
        console.log(event.target.getAttribute("data-podcast"))

        // CALL TABLE TO REDRAW ROWS WITH NEW DATA
        this.showTable = false;
        this.triggerTable = true;
        setTimeout(() => this.dataTableAngular(), 10);

      }
    });

  }
  private dataInstance() {
    this.datatableElement.dtInstance
      .then((dtInstance: DataTables.Api) => {
        console.log(dtInstance.page.info())
        console.log(dtInstance)
        dtInstance.destroy();
        this.dataTableAngular();
        dtInstance.draw();
      });
  }
  ngOnDestroy() {
    if (this.apiSubcription) {
      this.apiSubcription.unsubscribe();
    }
  }
}
