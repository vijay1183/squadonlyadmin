import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";
import { Router } from "@angular/router";
import { StorageService } from "./storage.service";
import { Observable, filter, pluck, startWith, map, BehaviorSubject } from "rxjs";
import { NgbModal, NgbModalConfig } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";

import Swal from "sweetalert2";


@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public toggleMenu$ = new BehaviorSubject<boolean>(false);
  public Token: any = 'squadonlyadmin';
  public TokenUser: any = 'squadonlyuser';
  public isSpinnerVisible: boolean = false;
  public dtOptions = {
    scrollCollapse: true,
    ordering: true,
    displayLength: 25,
    responsive: true
  };

  private modalReference: any;
  public renderer!: Renderer2;
  // public masterOptions: DataTables.Settings = {
  //   ordering: true,
  //   pageLength: 25,
  //   responsive: true
  // }
  constructor(
    public router: Router,
    private storageService: StorageService,
    private modalService: NgbModal,
    config: NgbModalConfig,
    private toastr: ToastrService,
    public rendererFactory: RendererFactory2,
  ) {
    config.backdrop = "static";
    config.keyboard = false;
    this.renderer = rendererFactory.createRenderer(null, null);
  }
  public OpenPopup(content: any, selclass = "My_Popup", size = 'lg') {
    this.modalReference = this.modalService.open(content, { centered: true, windowClass: selclass, size });
  }
  public CloseModal() {
    this.modalReference ? this.modalReference.close() : "";
  }
  // LOCALSTORAGE
  public GetLS$(key: any, storageArea: any = "localStorage"): Observable<any> {
    let LData$: Observable<any>;
    LData$ = this.storageService.storageChange$.pipe(filter((o: any) => o.key === key), pluck("value"));
    const D: any = this.storageService.getStorageItem({ key, storageArea });
    return LData$ = LData$.pipe(startWith((D) ? D : null))
  }
  public SetLS$(key: string, value: string, storageArea: any = "localStorage"): void {
    this.storageService.setStorageItem({ key, value, storageArea });
  }
  // ENCRYPTION
  public Encrypt(o: any, salt: any) {
    o = JSON.stringify(o).split("");
    for (let i = 0, l = o.length; i < l; i++) {
      if (o[i] === "{") {
        o[i] = "}";
      } else if (o[i] === "}") {
        o[i] = "{";
      }
    }
    return btoa(encodeURI(salt + o.join("")));
  }
  public Decrypt(o: any, salt: any) {
    o = decodeURI(atob(o));
    if (salt && o.indexOf(salt) !== 0) {
      throw new Error("object cannot be decrypted");
    }
    o = o.substring(salt.length).split("");
    for (let i = 0, l = o.length; i < l; i++) {
      if (o[i] === "{") {
        o[i] = "}";
      } else if (o[i] === "}") {
        o[i] = "{";
      }
    }
    return JSON.parse(o.join(""));
  }
  // SWEET ALERT
  public SwalSuccess(msg: string, heading = "Success!") {
    Swal.fire({
      title: heading,
      text: msg,
      icon: "success",
      confirmButtonColor: "#7e3f97",
    });
  }
  public SwalWarning(msg: any, heading = "Warning") {
    Swal.fire(heading, msg, "warning");
  }
  public SwalError(msg: any, heading = "Error") {
    Swal.fire(heading, msg, "error");
  }
  public Swalhtml(icon: any, Heading: any, msg: any) {
    Swal.fire({
      title: Heading,
      html: msg,
      icon,
      showCloseButton: false,
      showCancelButton: false,
      focusConfirm: false,
    });
  }
  public SwalClose() {
    Swal.close()
  }
  public SwalSuccessAutoclose(msg: string, timer = 2000, heading = "Success!") {
    Swal.fire({
      title: heading,
      text: msg,
      icon: "success",
      confirmButtonColor: "#7e3f97",
      timer,
      timerProgressBar: true,
    });
  }
  public logout() {
    Swal.fire({
      title: "Are you sure?",
      text: "Want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "&nbsp; &nbsp; Logout! &nbsp; &nbsp; ",
      cancelButtonText: "No, Continue",
    }).then((result: any) => {
      if (result.value) {
        this.GotoURL('/');
        this.SetLS$(this.Token, JSON.stringify(null));
        this.SetLS$(this.TokenUser, JSON.stringify(null));
      }
    });
  }

  public showSuccess(msg: string, heading = "Success") {
    this.toastr.success(msg, heading);
  }
  public showError(msg: string, heading = "Error") {
    this.toastr.error(msg, heading);
  }
  public GotoURL(url: string) {
    this.router.navigateByUrl(url);
  }

  public GotoURLQueryParam(path: string, queryParams: {}) {
    this.router.navigate([path], { queryParams: queryParams });
  }

  public GotoURLParam(path: string, param: string) {
    this.router.navigate([path, param]);
  }

  public async userinfo(): Promise<any> {
    try {
      return new Promise((resolve, reject) => {
        this.GetLS$(this.TokenUser).pipe(map(r => (r && r !== 'null' && r !== null) ? this.Decrypt(JSON.parse(r), this.TokenUser) : null))
          .subscribe((r: any) => resolve(r))
      });
    } catch (error) {
      console.log(error);
    }
  }
  public getFormValidationErrors(Form: any) {
    const ErrorArray: any = [];
    Object.keys(Form.controls).forEach((key) => {
      const controlErrors: any = Form.get(key)!.errors;
      if (controlErrors != null) {
        switch (key) {
          case 'Firstname':
            key = 'First Name'
            break;
          case 'Lastname':
            key = 'Last Name'
            break;
          case 'DifficultyLevelTypeName':
            key = 'Difficulty Level'
            break;
        }
        ErrorArray.push(key.replace(/([a-z])([A-Z])/g, "$1 $2"));
      }
    });
    return ErrorArray.filter((n: any) => n);
  }
}