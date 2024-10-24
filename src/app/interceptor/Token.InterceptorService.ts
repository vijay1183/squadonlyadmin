import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, NgZone } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { throwError } from "rxjs/internal/observable/throwError";
import { catchError } from "rxjs/internal/operators/catchError";
import { CommonService } from "../services/common.service";
@Injectable()
export class TokenInterceptorService implements HttpInterceptor {
  constructor(
    private zone: NgZone,
    private CF: CommonService,
  ) {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // const path: any = req.url.split('/');
    // const url = path[path.length - 1].split('?');    
    // const IgnoreUrls = ["token"].includes(url[0]);
    const IgnoreUrls =(req.url).includes('connect/token');
    if (!IgnoreUrls) {
      const getUser = localStorage.getItem(this.CF.Token);
      const user = (getUser) ? this.CF.Decrypt(JSON.parse(getUser), this.CF.Token) : null;
      req = req.clone({        
        setHeaders: { Authorization: `Bearer ${user.access_token}` } });
      return next.handle(req)
    }
    return next.handle(req).pipe(
      catchError(err => {
        this.zone.run(() => this.CF.SwalError('Session Expired', 'Error!'));
        return throwError(() => err);
      }));
  }
}
