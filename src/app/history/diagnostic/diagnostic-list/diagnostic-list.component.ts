import {Component, OnInit} from '@angular/core';
import {HistoryService} from "@history/history.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {AuthService} from "@authentication/auth.service";

@Component({
  selector: 'app-diagnostic-list',
  templateUrl: './diagnostic-list.component.html',
  styleUrls: ['./diagnostic-list.component.scss']
})
export class DiagnosticListComponent implements OnInit{
  constructor(public historyService: HistoryService,
              private router: Router,
              private route: ActivatedRoute,
              public authService: AuthService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (param:Params) => {
        this.historyService.getDiagHistory(param);
      }
    )
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

  tConvert (time:any) {
    time = time.toString ().match (/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice (1);
      time[5] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = +time[0] % 12 || 12;
    }
    return time.join ('');
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
