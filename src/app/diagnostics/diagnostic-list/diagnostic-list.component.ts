import {Component, OnInit} from '@angular/core';
import {ConfirmationService, MessageService} from 'primeng/api';
import {DialogService} from "primeng/dynamicdialog";
import {CreateDiagnosticComponent} from "@diagnostics/create-diagnostic/create-diagnostic.component";
import {DiagnosticsService} from "@diagnostics/diagnostics.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {RefreshService} from "@shared/services/refresh.service";

@Component({
  selector: 'app-diagnostic-diagnostic-list',
  templateUrl: './diagnostic-list.component.html',
  styleUrls: ['./diagnostic-list.component.scss'],
  providers: [MessageService, DialogService, ConfirmationService]
})
export class DiagnosticListComponent implements OnInit{


  // sortBy !: FormControl;

  // sortOptions !: any[];

  constructor(private messageService: MessageService,
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              public diagService: DiagnosticsService,
              private router: Router,
              private route: ActivatedRoute,
              private refreshService: RefreshService
              ) {
  }

  ngOnInit(){
    this.refreshService.refreshNeeded$
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

  addSingle() {
    this.messageService.add({severity:'success', summary:'Service Message', detail:'Via MessageService'});
  }

  showCreateDialog(){
    this.diagService.ref = this.dialogService.open(CreateDiagnosticComponent, {
      header: "New Diagnostic",
      style: this.diagService.role !== 'admin' ? {'min-width': '800px', 'max-height': '600px'} : {'width': '30%', "min-width": "300px"}
    });
  }

  showEditDialog(index: number){
    this.diagService.toggleEditMode();
    this.diagService.ref = this.dialogService.open(CreateDiagnosticComponent, {
      header: `Edit Diagnostic: ${this.diagService.diagnostics[index].serviceName}`,
      data: {
        index: index
      },
      style: {'width': '30%', "min-width": "300px"}
    });

    this.diagService.ref.onClose.subscribe(() => this.diagService.toggleEditMode());
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

}
