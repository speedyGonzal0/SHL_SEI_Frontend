import {Component, OnInit} from '@angular/core';
import {AuthService} from "@authentication/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  role !: any;
  constructor(public authService: AuthService) {
  }

  ngOnInit(){
    this.role = this.authService.getRole();
  }
}
