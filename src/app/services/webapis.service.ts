import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { CommonService } from './common.service';
import { map, mergeMap, of, switchMap, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WebapiService {
  // private readonly localUrl = 'https://prdataqualitywebapi.azurewebsites.net/api';
  private readonly prodUrl = `https://squad-api-dev.azurewebsites.net`;
  private WebApi = this.prodUrl;
  constructor(
    private Http: HttpClient,
    private CF: CommonService
  ) {
    // if (location.host.includes('localhost')) {
    //   this.WebApi = this.localUrl;
    // }
  }
  public async Login(username: string, password: string): Promise<any> {
    try {
      return new Promise((resolve) => {
        const url = `https://squad-auth-dev.azurewebsites.net/connect/token`;
        const body = 'grant_type=' + "password" + '&username=' + username + '&password=' + password + '&role=' + '2';
        const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded;');
        return this.Http.post<any>(url, body, { headers, responseType: 'json' })
          .pipe(
            map(token => {
              this.CF.SetLS$(this.CF.Token, JSON.stringify(this.CF.Encrypt(token, this.CF.Token)));
              return token
            }),
            mergeMap(() => this.Http.get<any>(`${this.prodUrl}/api/GetUserIdByToken`)),
            mergeMap(User => {              
              const url = `https://squad-api-dev.azurewebsites.net/api/GetUserById?UserId=${User['Data']['UserId']}`
              return this.Http.get<any>(url)
            }),
            map((d: any) => {
              return d && d.Code === 200
                ? { status: true, data: d.Data }
                : { status: false, error: (d.Message) ? d.Message : 'Something went wrong' };
            })
          ).subscribe((r: any) => resolve(r),
            err => resolve({ status: false, error: 'Something went wrong' }))
      });
    } catch (error) {
      console.log(error);
    }
  }
  public async getApis(
    servicepath: string,
    cache: boolean = true,
    userinfo = false
  ): Promise<any> {
    try {
      return new Promise(async (resolve) => {
        const user = (userinfo) ? await this.CF.userinfo() : null;
        const url = (userinfo) ? `${this.WebApi}/${servicepath}?CarrierID=${user.CarrierID}` : `${this.WebApi}/${servicepath}`;
        return this.Http.get<any>(url, {
          params: new HttpParams().set('cache', cache),
          responseType: 'json',
        })
          .pipe(
            map((d: any) => {
              return d && d.Status === 1
                ? { status: true, data: d.Data }
                : { status: false, error: (d.Message) ? d.Message : 'Something went wrong' };
            })
          )
          .subscribe({
            next: (r: any) => resolve(r),
            error: () => resolve({ status: false, error: 'Something went wrong' })
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
  public async postApis(servicepath: string, payload: any, userinfo = false): Promise<any> {
    try {
      return new Promise(async (resolve) => {
        const user = (userinfo) ? await this.CF.userinfo() : null;
        const url = (userinfo) ? `${this.WebApi}/${servicepath}?loggedInUserID=${user.UserID}` : `${this.WebApi}/${servicepath}`;
        return this.Http.post<any>(url, payload)
          .pipe(
            map((d: any) => {
              return d && d.Status === 1
                ? { status: true, data: d.Message, id: (d.Data) ? d.Data : 0 }
                : { status: false, error: d.Message };
            })
          )
          .subscribe({
            next: (r: any) => resolve(r),
            error: () => resolve({ status: false, error: 'Something went wrong' })
          });
      });
    } catch (error) {
      console.log(error);
    }
  }
}
