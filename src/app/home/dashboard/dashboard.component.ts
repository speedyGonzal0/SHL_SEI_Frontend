import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "@authentication/auth.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  role!: string;
  roleSub!: Subscription;
  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    this.roleSub = this.authService.userSourceInfo.subscribe((value:any) => {
      this.role = value.role?.toString()
    })
  }

  ngOnDestroy(){
    this.roleSub.unsubscribe();
  }
}
