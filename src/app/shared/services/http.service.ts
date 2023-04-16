import { Injectable } from '@angular/core';
import {tap} from "rxjs";
import {RefreshService} from "@shared/services/refresh.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient,
              private refreshService: RefreshService) {}
  getRequest(url: string){
    return this.http.get(url);
  }

  getRequestWithParams(url: string, queryParams: Params){
    return this.http.get(url, {params: queryParams})
  }

  deleteRequest(url: string){
    return this.http
      .delete(url, {responseType: 'text'})
      .pipe(
        tap(() => {
            this.refreshService._refreshNeeded$.next();
          }
        )
      )
  }

  updateRequest(url: string, body: any){
    return this.http
      .put<any>(url, body)
      .pipe(
        tap(() => {
            this.refreshService._refreshNeeded$.next();
          }
        )
      )
  }

  createRequest(url: string, body: any){
    return this.http
      .post<any>(url, body)
      .pipe(
        tap(() => {
          this.refreshService._refreshNeeded$.next();
          }
        )
      )
  }
}
