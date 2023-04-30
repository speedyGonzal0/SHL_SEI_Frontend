import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrgService} from "@shared/services/org.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {RegEx} from "@enums/regex";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-org-registration',
  templateUrl: './org-registration.component.html',
  styleUrls: ['./org-registration.component.scss'],
  providers: [MessageService]
})
export class OrgRegistrationComponent {

  orgForm!: FormGroup;

  orgEditID! : number;

  submitLabel = this.orgService.editMode ? "Edit" : "Create";
  constructor(public orgService: OrgService,
              private config: DynamicDialogConfig,
              private messageService: MessageService
              ) {
  }

  ngOnInit() {
    this.orgForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'address' : new FormControl(null, [Validators.required]),
      'phone' : new FormControl(null, [Validators.required, Validators.pattern(/(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/)]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'website' : new FormControl(null, [Validators.required, Validators.pattern(/^(https?:\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/)])
    })

    if(this.config.data) {
      let org = this.orgService.orgs[this.config.data.index];
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
      this.orgService.createOrg(this.orgForm.value)

  }

  editOrg(id:number, orgInfo: any){
    this.orgService.editOrg(id, orgInfo)
      .subscribe({
        next: response => {
          this.messageService.add({ key: 'tl', severity: 'info', summary: 'Success', detail: 'Org Info Edited' });
          this.orgForm.reset()
          this.orgService.orgRef.close()
        },
        error: err => {console.log(err)}
      })

  }
}
