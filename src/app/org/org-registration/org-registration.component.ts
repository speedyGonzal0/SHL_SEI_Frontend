import { Component } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-org-registration',
  templateUrl: './org-registration.component.html',
  styleUrls: ['./org-registration.component.scss']
})
export class OrgRegistrationComponent {
  orgRegForm: FormGroup;

  ngOnInit() {
    this.orgRegForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'address' : new FormControl(null, [Validators.required]),
      'phone' : new FormControl(null, [Validators.required]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'website' : new FormControl(null),
    })
  }

  onCreateOrg(){
    console.log(this.orgRegForm)
  }
}
