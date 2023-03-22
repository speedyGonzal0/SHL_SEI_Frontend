import { Component } from '@angular/core';
import {ConfirmationService} from 'primeng/api';
@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent {

  constructor(private confirmationService: ConfirmationService){
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to Log out?',
      accept: () => {
        //Actual logic to perform a confirmation
      }
    });
  }

}
