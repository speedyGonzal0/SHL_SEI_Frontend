import {Component, OnInit} from '@angular/core';
import {DiagnosticsService} from "@diagnostics/diagnostics.service";
import {Router} from "@angular/router";
import {HistoryService} from "./history.service";
import {AuthService} from "@authentication/auth.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent{
  constructor(public authService: AuthService) {
  }
}
