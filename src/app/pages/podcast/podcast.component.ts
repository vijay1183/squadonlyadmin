import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { WebapiService } from 'src/app/services/webapis.service';
import { NumtobooleanPipe } from './pipes/numbertobolean/numtoboolean.pipe';
// import { ThumbnailsPipe } from './pipes/thumbnails/thumbnails.pipe';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrls: ['./podcast.component.scss'],
  providers: [DatePipe, NumtobooleanPipe]
})
export class PodcastComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective;
  public breadcrumbs = [{ title: 'Dashboard', link: '/dashboard' }, { title: 'Podcast', link: '' }];
  private columnDefs = [
    { "title": "Title", "data": "Title" },
    { "title": "Source", "data": "Source" },

    { "title": "Created", "data": "CreatedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    { "title": "Updated", "data": "UpdatedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    { "title": "IsVerified", "data": "IsVerified", ngPipeInstance: this.NumtobooleanPipe },
    {
      "title": "Thumbnail",

      render: (data: any, type: any, full: any) => {
        return `<img src="${full?.ThumbnailImageUrl}" style="width: 50px; height: 50px" />`;
      }

      // "data": "ThumbnailImageUrl", ngPipeInstance: this.ThumbnailsPipe 
    },
    { "title": "Status", "data": "Status", ngPipeInstance: this.NumtobooleanPipe },
    {
      title: 'Action',
      render: (data: any, type: any, full: any) => {
        return `<button type="button" class="btn btn-sm btn-success text-white" data-podcast="${full?.PodcastId}">Details</button> <button type="button" class="btn btn-sm btn-primary text-white px-4" data-edit="${full?.PodcastId}">Edit</button>`;
      }
    }
  ];
  public dtOptions: DataTables.Settings = {
    columns: this.columnDefs,
    pagingType: 'simple_numbers',
    lengthMenu: [10, 20, 30, 40, 50],
    pageLength: 10,
    autoWidth: false,
    ordering: true,
    searching: true,
    serverSide: true,
    processing: true
  };
  private apiSubcription: Subscription | undefined;
  public showTable: boolean = false;
  public triggerTable: boolean = false;
  private searchText$ = new BehaviorSubject<string>('');
  private listenerFn = () => { };
  private rowRecords = [];
  constructor(
    private API: WebapiService,
    private CF: CommonService,
    private renderer: Renderer2,
    private pipeDateInstance: DatePipe,
    private NumtobooleanPipe: NumtobooleanPipe,
    // private ThumbnailsPipe: ThumbnailsPipe
  ) { }
  ngOnInit(): void {
    this.dataTableAngular();
  }
  private dataTableAngular() {
    this.triggerTable = false;
    let delayTimer = 0;
    const that = this;
    this.dtOptions['ajax'] = (dataTablesParameters: any, callback) => {
      let SortColumn = this.columnDefs[dataTablesParameters['order'][0]['column']]['data'];
      if (!SortColumn) {
        SortColumn = this.columnDefs[0]['data'];
      }
      const typedValue = dataTablesParameters['search']['value'];
      this.searchText$.next(typedValue);
      // this.showTable = (dataTablesParameters['start'] !== 0 && typedValue.length !== 0);      
      if (that.apiSubcription) {
        that.apiSubcription.unsubscribe();
      }
      that.apiSubcription = that.searchText$.pipe(
        debounceTime(delayTimer),
        distinctUntilChanged(),
        switchMap(() => {
          return that.API.getAPI(`GetPodcastsForAdmin?SearchValue=${typedValue}&StartRowIndex=${(dataTablesParameters['start'] / dataTablesParameters['length']) + 1}&PageSize=${dataTablesParameters['length']}&SortColumn=${SortColumn}&SortType=${dataTablesParameters['order'][0]['dir']}&Status=${(this.selectedFilterValue === 'null') ? '' : (this.selectedFilterValue === 'true') ? true : false}`)
        })
      )
        .subscribe((resp: any) => {
          delayTimer = 750;
          this.rowRecords = resp.Data;
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
    this.listenerFn = this.renderer.listen('document', 'click', (event) => {
      if (event.target.hasAttribute("data-edit")) {
        const ID = event.target.getAttribute("data-edit");
        this.selectedPOD = this.rowRecords.filter((x: any) => x['PodcastId'] === ID)[0];
        this.CF.OpenPopup(this.formpopup, "my_popup");
        return
        // this.API.getApis(`GetPodCastById?PodcastId=${event.target.getAttribute("data-edit")}`).then((content) => {
        //   this.CF.OpenPopup(this.formpopup, "my_popup");
        //   this.selectedPOD = content['data']['Data'];
        // });
        // return
      }
      if (event.target.hasAttribute("data-podcast")) {
        this.CF.GotoURLParam('/podcast', event.target.getAttribute("data-podcast"))
        // CALL TABLE TO REDRAW ROWS WITH NEW DATA
        // this.showTable = false;
        // this.triggerTable = true;
        // setTimeout(() => this.dataTableAngular(), 10);
      }
    });
  }
  // private dataInstance() {
  //   this.datatableElement.dtInstance
  //     .then((dtInstance: DataTables.Api) => {
  //       console.log(dtInstance.page.info())
  //       console.log(dtInstance)
  //       dtInstance.destroy();
  //       this.dataTableAngular();
  //       dtInstance.draw();
  //     });
  // }
  @ViewChild("formpopup", { static: false }) formpopup: ElementRef | undefined;
  public formSubmmited(evt: any) {
    // CALL TABLE TO REDRAW ROWS WITH NEW DATA
    this.showTable = false;
    this.triggerTable = true;
    setTimeout(() => this.dataTableAngular(), 10);
  }
  public selectedPOD: any;
  ngOnDestroy() {
    if (this.apiSubcription) {
      this.apiSubcription.unsubscribe();
    }
    this.listenerFn();
  }

  public selectedFilterValue: string = 'true';
  public onFilterChange(evt: any) {
    // CALL TABLE TO REDRAW ROWS WITH NEW DATA
    this.showTable = false;
    this.triggerTable = true;
    setTimeout(() => this.dataTableAngular(), 10);
  }
}
