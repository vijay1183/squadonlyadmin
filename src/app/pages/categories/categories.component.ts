// import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { WebapiService } from 'src/app/services/webapis.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  // providers: [DatePipe]
})
export class CategoriesComponent implements OnInit, AfterViewInit {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective;
  public breadcrumbs = [{ title: 'Dashboard', link: '/dashboard' }, { title: 'Categories', link: '' }];
  private columnDefs = [
    { "title": "Category Name", "data": "CategoryName" },
    { "title": "Category Code", "data": "CategoryCode" },
    { "title": "IsActive", "data": "IsActive" },
    { "title": "IsDeleted", "data": "IsDeleted" },
    { "title": "Total Count", "data": "TotalCount" }
    // {
    //   title: 'Action',
    //   render: (data: any, type: any, full: any) => {
    //     return `<button type="button" class="btn btn-sm btn-success text-white" data-podcast="${full.PodcastId}">Details</button>`;
    //   }
    // }
  ];
  public dtOptions: DataTables.Settings = {
    pagingType: 'simple_numbers',
    autoWidth: false,
    searching: true,
    pageLength: 10,
    serverSide: true,
    processing: true,
    columns: this.columnDefs,    
    dom: 'ltipr'
  };
  private apiSubcription: Subscription | undefined;
  public showTable: boolean = false;
  constructor(
    private API: WebapiService,
    private renderer: Renderer2,
    // private pipeDateInstance: DatePipe
  ) { }
  ngOnInit(): void {
    const that = this;
    this.dtOptions['ajax'] = (dataTablesParameters: any, callback) => {
      if (that.apiSubcription) {
        that.apiSubcription.unsubscribe();
      }
      that.apiSubcription = that.API.getAPI(`GetPodCastCategories?StartRowIndex=${(dataTablesParameters['start'] / dataTablesParameters['length']) + 1}&PageSize=${dataTablesParameters['length']}`)
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
      }
    });
    // this.datatableElement.dtInstance
    //   .then((dtInstance: DataTables.Api) => {
    //     console.log(dtInstance.page.info())
    //     console.log(dtInstance)
    //     // dtInstance.destroy();
    //   });
  }
}
