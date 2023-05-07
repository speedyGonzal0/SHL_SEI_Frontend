import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "@authentication/auth.service";
import {HttpService} from "@shared/services/http.service";
import {Router} from "@angular/router";
import {ApiPaths} from "@enums/api-paths";
import {NotificationService} from "@shared/components/notification/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: []
})
export class LoginComponent {
  loginForm!: FormGroup;
  authURL = ApiPaths.auth;

  roles: any = {
    'admin@gmail.com': "ROLE_ADMIN",
    'orgAdmin@gmail.com': "ROLE_ORG_ADMIN",
    'drUser@gmail.com': "ROLE_DOCTOR_RECEPTIONIST",
    'diagUser@gmail.com': "ROLE_DIAGNOSTIC_RECEPTIONIST",
    'pharmaUser@gmail.com': "ROLE_PHARMACIST"
  }

  constructor(private authService: AuthService,
              private httpService: HttpService,
              private router: Router,
              private notificationService: NotificationService
              ) {}

  ngOnInit() {
    this.loginForm = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)]),
    })
  }

  onLogin(){
    this.httpService.loginRequest(`${this.authURL}/login`,
      this.loginForm.value)
      .subscribe({
        next: (response) => {
          localStorage.setItem("token", response);
          this.authService.fetchUser().subscribe({
            next: (response: any) => {
              this.authService.setUser(response);
              this.router.navigate([''])
            },
            error: err => {
              this.notificationService.sendErrorMessage(JSON.parse(err.error).message);
            }
          })
        },
        error: (err) => {
          this.notificationService.sendErrorMessage(JSON.parse(err.error).message);
        }
      }
    )
  }

}
