import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { shareReplay, first, filter, tap } from 'rxjs/operators';
import { TransferState, makeStateKey } from '@angular/platform-browser';
@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  public readonly store: Record<string, Observable<HttpEvent<any>>> = {};
  constructor(
    private transferState: TransferState,
  ) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {    
    if (req.method !== 'GET' || !req.params.get('cache')) {
      return next.handle(req)
    }
    if (req.params.get('cache') === 'false') {
      return (this.store[req.urlWithParams.replace("cache=false", "cache=true")] = next.handle(req).pipe(
        filter((res) => res instanceof HttpResponse),
        shareReplay(1),
      ));
    }
    const storedResponse: any = this.transferState.get(makeStateKey(req.url), null);
    if (storedResponse) {
      const response = new HttpResponse({ body: storedResponse, status: 200 });
      return of(response);
    }
    const cachedObservable = this.store[req.urlWithParams] ||
      (this.store[req.urlWithParams] = next.handle(req).pipe(
        filter((res) => res instanceof HttpResponse),
        shareReplay(1),
      ));
    return cachedObservable.pipe(first());
  }
}
