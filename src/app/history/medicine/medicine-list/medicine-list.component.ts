import {Component, OnInit} from '@angular/core';
import {HistoryService} from "../../history.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-medicine-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss']
})
export class MedicineListComponent implements OnInit{
  constructor(public historyService: HistoryService,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(
      (param:Params) => {
        this.historyService.getMedHistory(param);
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
