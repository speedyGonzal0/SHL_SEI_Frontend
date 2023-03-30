import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) {}
  getRequest(url: string){
    return this.http.get(url)
  }

  deleteRequest(url: string){
    return this.http.delete(url)
  }

  updateRequest(url: string, body: any){
    return this.http.put<any>(url, body)
  }

  createRequest(url: string, body: any){
    return this.http.post<any>(url, body)
  }
}
