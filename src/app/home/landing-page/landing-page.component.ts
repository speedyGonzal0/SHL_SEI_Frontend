import {Component, OnInit} from '@angular/core';
import {AuthService} from "@authentication/auth.service";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{

  routerLink!: string;

  constructor(public authService: AuthService) {
  }

  ngOnInit() {
    let role = this.authService.getRole();
    if(role === "ROLE_ADMIN" || role === "ROLE_ORG_ADMIN" ){
      this.routerLink = '/dashboard'
    }
    else if(role === "ROLE_DOCTOR_RECEPTIONIST"){
      this.routerLink = '/doctor/billing'
    }
    else if(role === "ROLE_DIAGNOSTIC_RECEPTIONIST"){
      this.routerLink = '/diagnostics/billing'
    }
    else if(role === "ROLE_PHARMACIST"){
      this.routerLink = '/medicine/billing'
    }

  }

}
