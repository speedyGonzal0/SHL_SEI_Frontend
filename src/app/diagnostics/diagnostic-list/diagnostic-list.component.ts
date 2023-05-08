import {Component, OnDestroy, OnInit} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {DialogService} from "primeng/dynamicdialog";
import {CreateDiagnosticComponent} from "@diagnostics/create-diagnostic/create-diagnostic.component";
import {DiagnosticsService} from "@diagnostics/diagnostics.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RefreshService} from "@shared/services/refresh.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-diagnostic-diagnostic-list',
  templateUrl: './diagnostic-list.component.html',
  styleUrls: ['./diagnostic-list.component.scss'],
  providers: [ DialogService, ConfirmationService]
})
export class DiagnosticListComponent implements OnInit, OnDestroy{


  // sortBy !: FormControl;

  // sortOptions !: any[];
  diagTableSub !: Subscription;

  constructor(
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              public diagService: DiagnosticsService,
              private router: Router,
              private route: ActivatedRoute,
              private refreshService: RefreshService
              ) {
  }

  ngOnInit(){
    this.diagTableSub = this.refreshService.diagnosticTable
      .subscribe(() => {
        this.route.queryParams.subscribe(
          (qp:Params) => {
            this.diagService.getData(qp);
            // console.log(qp)
          }
        )
        }
      )
    this.route.queryParams.subscribe(
      (qp:Params) => {
        this.diagService.getData(qp);
        // console.log(qp)
      }
    )


    // this.sortBy = new FormControl(null);
    //
    // if(this.diagService.role !== 'ROLE_ADMIN'){
    //   this.sortOptions = [
    //     { name: 'Sort By: None', query: '' },
    //     { name: 'Sort By: Name(Ascending)', query: 'serviceName' },
    //     { name: 'Sort By: Name(Descending)', query: 'serviceName_desc' },
    //     { name: 'Sort By: Price(High to low)', query: 'price' },
    //     { name: 'Sort By: Price (Low to High)', query: 'price_desc' }
    //   ];
    // }
    // else{
    //   this.sortOptions = [
    //     { name: 'Sort By: None', query: '' },
    //     { name: 'Sort By: Name(Ascending)', query: 'serviceName' },
    //     { name: 'Sort By: Name(Descending)', query: 'serviceName_desc' }
    //   ];
    // }

  }


  showCreateDialog(){
    this.diagService.diagRef = this.dialogService.open(CreateDiagnosticComponent, {
      header: "New Diagnostic",
      style: this.diagService.role !== 'ROLE_ADMIN' ? {'min-width': '600px', 'max-height': '600px'} : {'width': '25%', "min-width": "300px"}
    });
  }

  showEditDialog(index: number){
    this.diagService.toggleEditMode();
    this.diagService.diagRef = this.dialogService.open(CreateDiagnosticComponent, {
      header: `Edit Diagnostic`,
      data: {
        index: index % 10
      },
      style: {'width': '25%', "min-width": "300px"}
    });

    this.diagService.diagRef.onClose.subscribe(() => {
      this.diagService.toggleEditMode();
    });
  }

  // onSort(){
  //   if(this.sortBy.value.query === ''){
  //     this.router.navigate([])
  //   }
  //   else{
  //     this.router.navigate([],
  //       {relativeTo: this.route,
  //         queryParams: {sortBy: this.sortBy.value.query},
  //         queryParamsHandling: 'merge'
  //       }
  //     )
  //   }
  // }

  onDelete(index: number){
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete <b>${this.diagService.diagnostics[index].serviceName}</b>?`,
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-outlined p-button-secondary",
      accept: () => {
        this.diagService.deleteValue(index);
      }
    });
  }

  onSearch(value: any){
    if(value === ''){
      this.router.navigate([]);
    }
    else{
      this.router.navigate([], {queryParams: {query: value}, queryParamsHandling: 'merge'})
    }
  }

  onPagination(firstIndex: number){
    // console.log(firstIndex);
    let page = firstIndex / 10;
    if(firstIndex === 0){
      this.router.navigate([]);
    }
    else{
      this.router.navigate([],
        {
          queryParams: {page: parseInt(String(page), 10)},
          queryParamsHandling: "merge"
        })
    }
  }

  ngOnDestroy() {
    this.diagTableSub.unsubscribe();
  }

}
