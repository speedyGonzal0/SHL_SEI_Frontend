import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrgService} from "@shared/services/org.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {RegEx} from "@enums/regex";
import {NotificationService} from "@shared/components/notification/notification.service";
import {RefreshService} from "@shared/services/refresh.service";

@Component({
  selector: 'app-org-registration',
  templateUrl: './org-registration.component.html',
  styleUrls: ['./org-registration.component.scss'],
  providers: []
})
export class OrgRegistrationComponent {

  orgForm!: FormGroup;
  addressValue!: string;
  orgEditID! : number;

  submitLabel = this.orgService.editMode ? "Update" : "Confirm";
  constructor(public orgService: OrgService,
              private config: DynamicDialogConfig,
              private refreshService: RefreshService,
              private notificationService: NotificationService
              ) {
  }

  ngOnInit() {
    this.orgForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'address' : new FormControl(null, [Validators.required]),
      'phone' : new FormControl(null, [Validators.required, Validators.pattern(/(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/)]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'website' : new FormControl(null, [Validators.required, Validators.pattern(/^(https?:\/\/)?www.[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)])
    })

    if(this.config.data) {
      let org = this.orgService.orgs[this.config.data.index];
      this.addressValue = org.address
      this.orgForm.setValue({
        name: org.name,
        phone: org.phone,
        email: org.email,
        address: org.address,
        website: org.website
      })
      this.orgEditID = org.id
    }
  }

  onSubmit(){
    this.orgService.editMode
      ?
      this.editOrg(this.orgEditID, this.orgForm.value)
      :
      this.createOrg()

  }

  createOrg(){
    this.orgForm.controls['address'].setValue(this.addressValue);
    this.orgService.createOrg(this.orgForm.value).subscribe({
      next: response => {
        this.notificationService.sendSuccessMessage("Created Successfully!")
        this.orgForm.reset();
        this.refreshService.updateOrgTable();
        this.orgService.orgRef.close();
      },
      error: err => {
        this.notificationService.sendErrorMessage(`${err.error.message}` );
      }
    })
  }

  editOrg(id:number, orgInfo: any){
    this.orgService.editOrg(id, orgInfo)
      .subscribe({
        next: response => {
          this.notificationService.sendSuccessMessage("Edit Successful!")
          this.orgForm.reset();
          this.refreshService.updateOrgTable();
          this.orgService.orgRef.close()
        },
        error: err => {
          this.notificationService.sendErrorMessage(`${err.error.message}`);
        }
      })

  }
}
