import {Component, OnInit} from '@angular/core';
import {DiagnosticsService} from "@diagnostics/diagnostics.service";
import {Router} from "@angular/router";
import {HistoryService} from "./history.service";

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})

export class HistoryComponent implements OnInit{
  constructor(public historyService: HistoryService,
              private router: Router) {}

  ngOnInit() {
    this.historyService.getDiagHistory()
  }

  onPagination(firstIndex: number){
    let page = firstIndex / 10;
    if(firstIndex === 0){
      this.router.navigate([]);
    }
    else{
      this.router.navigate([],
        {
          queryParams: {pageNo: parseInt(String(page), 10)},
          queryParamsHandling: "merge"
        })
    }
  }

  onSearch(value: any){
    if(value === ''){
      this.router.navigate([]);
    }
    else{
      this.router.navigate([], {queryParams: {query: value}, queryParamsHandling: 'merge'})
    }
  }
}