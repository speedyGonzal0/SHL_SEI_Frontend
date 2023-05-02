import {Component, OnInit} from '@angular/core';
import {MessageService} from "primeng/api";
import {NotificationService} from "@shared/components/notification/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit{
  constructor(private messageService: MessageService,
              private notificationService: NotificationService) {
  }

  ngOnInit() {
    this.notificationService.sendMessage.subscribe(msg => {
      if(msg.type === "Error") {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: `${msg.message}`})
      }

        if(msg.type === "Success") {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: `${msg.message}`})
        }
    })
  }
}
