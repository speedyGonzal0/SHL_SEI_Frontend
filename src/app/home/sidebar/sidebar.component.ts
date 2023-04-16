import { Component } from '@angular/core';
import {AuthService} from "@authentication/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {

  role = this.authService.getRole()
  constructor(public authService: AuthService) {
  }
}
