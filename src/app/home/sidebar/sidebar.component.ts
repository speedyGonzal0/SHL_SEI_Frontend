import {Component, OnInit} from '@angular/core';
import {AuthService} from "@authentication/auth.service";
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{

  role !: any;
  items!: MenuItem[];
  constructor(public authService: AuthService) {
  }

  ngOnInit(){
    this.role = this.authService.getRole();

    if (this.role === 'ROLE_ADMIN' || this.role === 'ROLE_ORG_ADMIN'){
      this.items = [
        {
          label: 'Bill History',
          icon: 'pi pi-history',
          items: [
            {
              label: 'Diagnostic',
              routerLink: 'history/diagnostic'
            },
            {
              label: 'Medicine',
              routerLink: 'history/medicine'
            },
            {
              label: 'Doctor',
              routerLink: 'history/doctor-appointment'
            }
          ]
        }
      ]
    }
    else if(this.role === 'ROLE_DOCTOR_RECEPTIONIST'){
      this.items = [
        {
          label: 'Bill History',
          icon: 'pi pi-history',
          items: [
            {
              label: 'Doctor',
              routerLink: 'history/doctor-appointment'
            }
          ]
        }
      ]
    }
    else if(this.role === 'ROLE_DIAGNOSTIC_RECEPTIONIST'){
      this.items = [
        {
          label: 'Bill History',
          icon: 'pi pi-history',
          items: [
            {
              label: 'Diagnostic',
              routerLink: 'history/diagnostic'
            }
          ]
        }
      ]
    }
    else{
      this.items = [
        {
          label: 'Bill History',
          icon: 'pi pi-history',
          items: [

            {
              label: 'Medicine',
              routerLink: 'history/medicine'
            }
          ]
        }
      ]
    }

  }
}
