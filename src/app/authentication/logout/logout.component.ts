import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MenuItem} from 'primeng/api';
import {AuthService} from "@authentication/auth.service";
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit{

  menuItems !: MenuItem[];

  constructor(private confirmationService: ConfirmationService,
              private authService: AuthService){
  }

  ngOnInit() {
    this.menuItems = [
      {
        label: 'Signed in as ADMIN',
        escape: false,
        disabled: true
      },
      {
        label: 'Admin name',
        escape: false,
        disabled: true
      },
      {
        label: 'Log out',
        icon: "pi pi-sign-out",
        command: () => this.confirm()
      }
    ];
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Log out?',
      accept: () => {
        this.authService.logout()
      }
    });
  }

}
