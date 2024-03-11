import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
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
    { "title": "Published", "data": "PublishedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    { "title": "Created", "data": "CreatedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    { "title": "Updated", "data": "UpdatedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    {
      title: 'Action',
      render: (data: any, type: any, full: any) => {
        return `<button type="button" class="btn btn-sm btn-success text-white" data-podcast="${full.PodcastId}">Details</button>`;
      }
    }
  ];
  public dtOptions: DataTables.Settings = {
    columns: this.columnDefs,
    pagingType: 'simple_numbers',
    lengthMenu: [10, 20, 30, 40, 50],
    pageLength: 10,
    autoWidth: false,
    ordering: false,
    searching: true,
    serverSide: true,
    processing: true
  };
  private apiSubcription: Subscription | undefined;
  public showTable: boolean = false;
  public triggerTable: boolean = false;
  private searchText$ = new BehaviorSubject<string>('');
  private listenerFn = () => { };

  constructor(
    private API: WebapiService,
    private CF: CommonService,
    private renderer: Renderer2,
    private pipeDateInstance: DatePipe
  ) { }
  ngOnInit(): void {
    this.dataTableAngular();
  }
  private dataTableAngular() {
    let delayTimer = 0;
    const that = this;
    this.dtOptions['ajax'] = (dataTablesParameters: any, callback) => {
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
          return that.API.getAPI(`GetPodCasts?SearchValue=${typedValue}&StartRowIndex=${(dataTablesParameters['start'] / dataTablesParameters['length']) + 1}&PageSize=${dataTablesParameters['length']}`)
        })
      )
        .subscribe((resp: any) => {
          delayTimer = 500;
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
  ngOnDestroy() {
    if (this.apiSubcription) {
      this.apiSubcription.unsubscribe();
    }
    this.listenerFn();
  }
}
