import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {AppRoutingModule} from "./app-routing.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HttpRequestInterceptor} from "@shared/services/http-request.interceptor";
import {AuthenticationModule} from "@authentication/authentication.module";
import {AuthGuard} from "@authentication/auth.guard";
import {AuthService} from "@authentication/auth.service";
import {LoginInterceptor} from "@shared/services/login.interceptor";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticationModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: HttpRequestInterceptor,
    multi: true
  },
    {provide: HTTP_INTERCEPTORS,
      useClass: LoginInterceptor,
      multi: true
    },
  AuthGuard,
  AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
