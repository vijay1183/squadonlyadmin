import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { WebapiService } from 'src/app/services/webapis.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective;
  public breadcrumbs = [{ title: 'Dashboard', link: '/dashboard' }, { title: 'Users', link: '' }];

  private columnDefs = [
    { "title": "FirstName", "data": "FirstName" },
    { "title": "LastName", "data": "LastName" },
    { "title": "RoleId", "data": "RoleId" },
    { "title": "IsActive", "data": "IsActive" },
    { "title": "MobileNumber", "data": "MobileNumber" },
    { "title": "Email", "data": "Email" },
    { "title": "UserName", "data": "UserName" },
    { "title": "Password", "data": "Password" },
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
