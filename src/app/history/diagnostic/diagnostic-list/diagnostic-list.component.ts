import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../history.service";
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

  onSearch(value: any){
    if(value === ''){
      this.router.navigate([]);
    }
    else{
      this.router.navigate([], {queryParams: {query: value}, queryParamsHandling: 'merge'})
    }
  }
}
