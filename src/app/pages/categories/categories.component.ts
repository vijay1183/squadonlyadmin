// import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { CommonService } from 'src/app/services/common.service';
import { WebapiService } from 'src/app/services/webapis.service';
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
  // providers: [DatePipe]
})
export class CategoriesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(DataTableDirective, { static: false }) datatableElement: any = DataTableDirective;
  public breadcrumbs = [{ title: 'Dashboard', link: '/dashboard' }, { title: 'Categories', link: '' }];
  private columnDefs = [
    { "title": "Category Name", "data": "CategoryName" },
    { "title": "Category Code", "data": "CategoryCode" },
    {
      title: 'Action',
      render: (data: any, type: any, full: any) => {
        return `<button type="button" class="btn btn-sm btn-success text-white" data-podcast="${full.PodcastCategoryId}">Edit</button>`;
      }
    }
    // { "title": "IsActive", "data": "IsActive" },
    // { "title": "IsDeleted", "data": "IsDeleted" }
  ];
  public dtOptions: DataTables.Settings = {
    pagingType: 'simple_numbers',
    ordering: false,
    autoWidth: false,
    searching: true,
    pageLength: 10,
    lengthMenu: [10, 20, 30, 40, 50],
    serverSide: true,
    processing: true,
    columns: this.columnDefs,
    dom: 'ltipr'
  };
  private apiSubcription: Subscription | undefined;
  private tableData = [];
  public showTable: boolean = false;
  private listenerFn = () => { };
  constructor(
    private API: WebapiService,
    private renderer: Renderer2,
    private fb: FormBuilder,
    private CF: CommonService
  ) { }
  ngOnInit(): void {
    this.dataTableAngular();
    this.GenerateForm();
  }
  private dataTableAngular() {
    this.triggerTable = false;
    const that = this;
    that.dtOptions['ajax'] = (dataTablesParameters: any, callback) => {
      if (that.apiSubcription) {
        that.apiSubcription.unsubscribe();
      }
      that.apiSubcription = that.API.getAPI(`GetPodCastCategories?StartRowIndex=${(dataTablesParameters['start'] / dataTablesParameters['length']) + 1}&PageSize=${dataTablesParameters['length']}`)
        .subscribe((resp: any) => {
          that.tableData = resp.Data;
          callback({
            recordsTotal: resp.TotalCount,
            recordsFiltered: resp.TotalCount,
            data: resp.Data
          });
          that.showTable = true;
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
        const selectedRecord = this.tableData.filter((x: any) => x.PodcastCategoryId === parseFloat(event.target.getAttribute("data-podcast")));
        this.UpdateForm(selectedRecord[0])
      }
    });
  }
  // REACTIVE FORM
  public Form!: FormGroup;
  public fields: any = [];
  public submitted: boolean = false;
  public success: boolean = false;
  public isUpdate: boolean = false;
  public FormLoading: boolean = false;
  private GenerateForm() {
    this.FormLoading = false;
    this.isUpdate = false;
    this.Form = this.fb.group({
      "PodcastCategoryId": 0,
      "podcastCategoryName": ["", [Validators.required]],
      "CategoryCode": [""],
      "isActive": [true, [Validators.required]],
      "isDeleted": [false, [Validators.required]]
    })
  }
  public UpdateForm(data: any) {
    data['podcastCategoryName'] = data['CategoryName'];
    data['isActive'] = Boolean(Number(data['IsActive']));
    this.isUpdate = true;
    this.FormLoading = true;
    setTimeout(() => {
      this.Form.patchValue(data);
      this.FormLoading = false;
    }, 300);
  }
  public cancel() {
    this.submitted = false;
    this.isUpdate = false;
    this.GenerateForm();
  }
  public triggerTable: boolean = false;
  public onSubmit() {
    this.submitted = true;
    let PAYLOAD: any = JSON.parse(JSON.stringify(this.Form.value));
    if (!this.Form.invalid) {
      const ADDPAth = `AddPodcastCategory?CategoryName=${PAYLOAD['podcastCategoryName']}`;
      const UPDATEPAth = `UpdatePodcastCategory`
      this.success = true;
      if ((PAYLOAD['PodcastCategoryId'] === 0)) {
        this.API.postApis(ADDPAth, {})
          .then((r: any) => {            
            if (r.status) {
              this.CF.SwalSuccess(r.data['Message'])
              this.submitted = this.success = this.isUpdate = false;
              this.Form.reset();
              this.GenerateForm();
              //  CALL TABLE TO REDRAW ROWS WITH NEW DATA
              this.showTable = false;
              this.triggerTable = true;
              setTimeout(() => this.dataTableAngular(), 10);
              return
            }
            this.submitted = this.success = false;
            this.CF.SwalError(r.error, 'Error!');
          })
          .catch((err: any) => {
            this.submitted = this.success = false;
            this.CF.SwalError('Something went wrong, Please try again.', 'Error!');
          })
        return
      }
      this.API.putApis(UPDATEPAth, {
        "podcastCategoryId": PAYLOAD['PodcastCategoryId'],
        "podcastCategoryName": PAYLOAD['podcastCategoryName'],
        "categoryCode": PAYLOAD['CategoryCode'],
        "isActive": Number(PAYLOAD['isActive']),
        "isDeleted": Number(PAYLOAD['isDeleted'])
      })
        .then((r: any) => {
          if (r.status) {
            this.CF.SwalSuccess(r.data['Message'])
            this.submitted = this.success = this.isUpdate = false;
            this.Form.reset();
            this.GenerateForm();
            //  CALL TABLE TO REDRAW ROWS WITH NEW DATA
            this.showTable = false;
            this.triggerTable = true;
            setTimeout(() => this.dataTableAngular(), 10);
            return
          }
          this.submitted = this.success = false;
          this.CF.SwalError(r.error, 'Error!');
        })
        .catch((err: any) => {
          this.submitted = this.success = false;
          this.CF.SwalError('Something went wrong, Please try again.', 'Error!');
        })
      return
    }
    const Errors = this.CF.getFormValidationErrors(this.Form).map((o: any) => `<span style="margin-bottom: 10px;display:inline-block; padding-left: 5px; font-size:12px"> ${o} </span>`)
    this.CF.Swalhtml('error', '<h6 class="text-danger mb-0">Fill all mandatory fields.</h6>', Errors)
  };
  ngOnDestroy() {
    if (this.apiSubcription) {
      this.apiSubcription.unsubscribe();
    }
    this.listenerFn();
  }
}
