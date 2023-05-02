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
              public authService: AuthService){
  }

  ngOnInit() {
    // let role = this.authService.getRole()!;
    // role = role.substring(role.indexOf("_") + 1);
    //
    // let user = localStorage.getItem('token')!;
    // user = JSON.parse(atob(user.split('.')[1])).sub;
    //
    // this.menuItems = [
    //   {
    //     label: `Signed in as ${role.replace('_',' ')}`,
    //     escape: false,
    //     disabled: true
    //   },
    //   {
    //     label: `${user}`,
    //     escape: false,
    //     disabled: true
    //   },
    //   {
    //     label: 'Log out',
    //     icon: "pi pi-sign-out",
    //     command: () => this.confirm()
    //   }
    // ];
  }

  confirm() {
    // this.confirmationService.confirm({
    //   message: 'Are you sure you want to Log out?',
    //   accept: () => {
        this.authService.logout()
    //   }
    // });
  }

}
