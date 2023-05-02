import {Component, OnInit} from '@angular/core';
import {ConfirmationService} from 'primeng/api';
import {DialogService} from "primeng/dynamicdialog";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MedicineService} from "@medicine/medicine.service";
import {CreateMedicineComponent} from "@medicine/create-medicine/create-medicine.component";
import {RefreshService} from "@shared/services/refresh.service";

@Component({
  selector: 'app-medicine-diagnostic-list',
  templateUrl: './medicine-list.component.html',
  styleUrls: ['./medicine-list.component.scss'],
  providers: [ DialogService, ConfirmationService]
})
export class MedicineListComponent implements OnInit{
  constructor(
              private dialogService: DialogService,
              private confirmationService: ConfirmationService,
              public medService: MedicineService,
              private router: Router,
              private route: ActivatedRoute,
              private refreshService: RefreshService
  ) {
  }

  ngOnInit(){
    this.medService.vendors = [];
    this.refreshService.refreshNeeded$
      .subscribe(() => {
        this.route.queryParams.subscribe(
          (qp:Params) => {
            this.medService.getData(qp);
          }
        )
        }
      )
    this.route.queryParams.subscribe(
      (qp:Params) => {
        this.medService.getData(qp);
      }
    )

  }


  showCreateDialog(){
    this.medService.medRef = this.dialogService.open(CreateMedicineComponent, {
      header: "New Medicine",
      style: {'min-width': '500px', 'max-height': '600px'}
    });
  }

  showEditDialog(index: number){
    this.medService.toggleEditMode();
    this.medService.medRef = this.dialogService.open(CreateMedicineComponent, {
      header: `Edit Medicine`,
      data: {
        index: index % 10
      }
    });

    this.medService.medRef.onClose.subscribe(() => {
      this.medService.toggleEditMode();
    });
  }

  onDelete(index: number){
    this.confirmationService.confirm({
      message: `Are you sure that you want to delete <b>${this.medService.medicines[index].medicine.name}</b>?`,
      acceptButtonStyleClass: "p-button-danger",
      rejectButtonStyleClass: "p-button-outlined p-button-secondary",
      accept: () => {
        this.medService.deleteValue(index);
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
