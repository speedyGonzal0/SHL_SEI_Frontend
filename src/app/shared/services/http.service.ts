import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Params} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}
  getRequest(url: string){
    return this.http.get(url);
  }

  getRequestWithParams(url: string, queryParams: Params){
    return this.http.get(url, {params: queryParams})
  }

  deleteRequest(url: string){
    return this.http.delete(url, {responseType: 'text'})
  }

  updateRequest(url: string, body: any){
    return this.http.put<any>(url, body)
  }

  createRequest(url: string, body: any){
    return this.http.post<any>(url, body)
  }
}
