import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {OrgService} from "@shared/services/org.service";
import {DynamicDialogConfig} from "primeng/dynamicdialog";

@Component({
  selector: 'app-org-registration',
  templateUrl: './org-registration.component.html',
  styleUrls: ['./org-registration.component.scss']
})
export class OrgRegistrationComponent {
  orgForm!: FormGroup;

  orgEditID! : number;

  submitLabel = this.orgService.editMode ? "Edit" : "Create";
  constructor(public orgService: OrgService, private config: DynamicDialogConfig) {
  }

  ngOnInit() {
    this.orgForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'address' : new FormControl(null, [Validators.required]),
      'phone' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'website' : new FormControl(null),
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
      this.orgService.editOrg(this.orgEditID, this.orgForm.value)
      :
      this.orgService.createOrg(this.orgForm.value)

    this.orgForm.reset()
    console.log(this.orgForm)
  }
}
