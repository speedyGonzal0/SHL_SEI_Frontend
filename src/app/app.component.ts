import {Component, OnInit} from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {AuthService} from "@authentication/auth.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  title = 'billing-systems-frontend';

  constructor(private primengConfig: PrimeNGConfig, private authService: AuthService) {}

  ngOnInit() {
    this.primengConfig.ripple = true;

    let token = localStorage.getItem('token');
    if (token){
      this.authService.fetchUser().subscribe({
        next: (response : any) => {
          this.authService.setUser(response)
        },
        error: err => {
          alert("Invalid token")
        }
      })
    }
  }
}
