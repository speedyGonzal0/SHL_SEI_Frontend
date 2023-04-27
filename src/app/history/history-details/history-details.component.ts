import { Component } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {HistoryService} from "../history.service";

@Component({
  selector: 'app-history-details',
  templateUrl: './history-details.component.html',
  styleUrls: ['./history-details.component.scss']
})
export class HistoryDetailsComponent {
  id! : number;
  constructor(public historyService: HistoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.doctorService.getDoctorByID(this.route.snapshot.params['id'])
    this.route.params.subscribe(
      (params: Params) => {
        this.historyService.getDiagHistoryByID(params['id'])
      }
    )
  }
}
