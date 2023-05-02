import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

interface Message {
  type: 'Success' | 'Error';
  message: string
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  sendMessage = new Subject<Message>();
  constructor() { }

  sendSuccessMessage(msg: string) {
    const message: Message = {
      type: 'Success',
      message: msg
    }
    this.sendMessage.next(message);
  }

  sendErrorMessage(msg: string) {
    const message: Message = {
      type: 'Error',
      message: msg
    }
    this.sendMessage.next(message);
  }
}
