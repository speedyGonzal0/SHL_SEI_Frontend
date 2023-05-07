import {APP_INITIALIZER, NgModule} from '@angular/core';
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
import { ErrorComponent } from './error/error.component';
import {ButtonModule} from "primeng/button";
import {SharedModule} from "@shared/shared.module";

function initializeApp() {
  console.log("initializing")
}

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        AuthenticationModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
      ButtonModule
    ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: () => initializeApp,
      multi: true
    },
    {
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
