import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../history.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-doctor-list',
  templateUrl: './doctor-list.component.html',
  styleUrls: ['./doctor-list.component.scss']
})
export class DoctorListComponent implements OnInit{
  constructor(public historyService: HistoryService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (param:Params) => {
        this.historyService.getDocHistory(param);
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
