import { Component } from '@angular/core';
import {AuthService} from "@authentication/auth.service";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent {

  sidebarVisible: boolean = false;
  role !: any;

  constructor(public authService: AuthService) {
  }
  ngOnInit(){
    this.role = this.authService.getRole();
  }
}
