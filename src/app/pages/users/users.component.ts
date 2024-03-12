import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { WebapiService } from 'src/app/services/webapis.service';
import { BooleanpipePipe } from './booleanpipe.pipe';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [DatePipe, BooleanpipePipe]
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective;
  public breadcrumbs = [{ title: 'Dashboard', link: '/dashboard' }, { title: 'Users', link: '' }];
  private columnDefs = [
    { "title": "Role", "data": "RoleName" },
    {
      title: 'Name',
      render: (data: any, type: any, full: any) => {
        return `${full.FirstName} ${full.LastName}`;
      }
    },
    { "title": "Email", "data": "Email" },
    { "title": "Mobile", "data": "MobileNumber" },
    { "title": "UserName", "data": "UserName" },
    { "title": "Password", "data": "Password" },
    { "title": "Created Date", "data": "CreatedDatetime", ngPipeInstance: this.pipeDateInstance, ngPipeArgs: ['mediumDate', 'MMM d, y'] },
    { "title": "IsActive", "data": "IsActive", ngPipeInstance: this.pipeBooleanInstance }
  ];
  public dtOptions: DataTables.Settings = {
    pagingType: 'simple_numbers',
    autoWidth: false,
    searching: true,
    pageLength: 10,
    lengthMenu: [10, 20, 30, 40, 50],
    serverSide: true,
    processing: true,
    ordering: false,
    columns: this.columnDefs,
    dom: 'ltipr'
  };
  private apiSubcription: Subscription | undefined;
  public showTable: boolean = false;
  constructor(
    private API: WebapiService,
    private pipeDateInstance: DatePipe,
    private pipeBooleanInstance: BooleanpipePipe,
    private renderer: Renderer2
  ) { }
  ngOnInit(): void {
    const that = this;
    this.dtOptions['ajax'] = (dataTablesParameters: any, callback) => {
      if (that.apiSubcription) {
        that.apiSubcription.unsubscribe();
      }
      that.apiSubcription = that.API.getAPI(`GetUsers?StartRowIndex=${(dataTablesParameters['start'] / dataTablesParameters['length']) + 1}&PageSize=${dataTablesParameters['length']}`)
        .subscribe(resp => {
          callback({
            recordsTotal: resp.TotalCount,
            recordsFiltered: resp.TotalCount,
            data: resp.Data
          });
          this.showTable = true;
        });
    };
    this.dtOptions['rowCallback'] = (row, data: any) => {      
      if(data['IsActive'] === 0){
        $(row).addClass('deactivated');
      }
    }
  }
  private IsActive(evt: any) {
    console.log(evt)
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
    //     dtInstance.destroy();
    //   });
  }
  ngOnDestroy() {
    if (this.apiSubcription) {
      this.apiSubcription.unsubscribe();
    }
  }
}
