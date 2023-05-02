import {Component, OnInit} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppUserService} from "@shared/services/app-user.service";
import {AuthService} from "@authentication/auth.service";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-app-user-registration',
  templateUrl: './app-user-registration.component.html',
  styleUrls: ['./app-user-registration.component.scss'],
  providers: [MessageService]

})
export class AppUserRegistrationComponent implements OnInit{
  constructor(public appUserService: AppUserService,
              private config: DynamicDialogConfig,
              public authService: AuthService,
              private messageService: MessageService
              ) {}

  appUserForm!: FormGroup;
  appUserEditID! : number;
  submitLabel = this.appUserService.editMode ? "Edit" : "Create";

  ngOnInit() {

    this.appUserForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, [Validators.required, Validators.pattern(/(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/)]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'gender' : new FormControl(null, [Validators.required]),
      'address' : new FormControl(null, [Validators.required]),
      'age' : new FormControl(null, [Validators.required, Validators.min(1)]),
      'role' : new FormControl(this.authService.role === "ROLE_ADMIN" ? [2] : null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required, Validators.minLength(8)]),
      'orgID' : new FormControl(null, [Validators.required]),
    }
    )

    if(this.appUserService.role === "ROLE_ORG_ADMIN"){
      this.appUserForm.controls['orgID'].setValue(this.authService.orgID);
    }

    if(this.config.data) {
      let appUser : any = this.appUserService.appUsers[this.config.data.index];
      this.appUserForm.setValue({
        name: appUser.name,
        phone: appUser.phone,
        email: appUser.email,
        gender: this.appUserService.genders.find(
          (genders) =>
            genders.gender.toLowerCase() === appUser.gender.toLowerCase()
        ),
        address: appUser.address,
        age: appUser.age,
        role:  this.appUserService.roles.filter(role => role.role.toLowerCase() === appUser.role[0].toLowerCase()),
        password: appUser.password,
        orgID: appUser.organization.id
      })
      this.appUserEditID = appUser.id
    }
  }

  onSubmit() {
    this.appUserService.editMode
      ?
      this.editUser()
      :
      this.createUser()

    this.appUserForm.reset()
  }

  editUser(){
    const roles = this.appUserForm.value.role.map((role: { value: any }) => {
      return role.value;
    });

    console.log(roles)
    console.log(this.appUserForm.value.role)

    this.appUserService.editUser(this.appUserEditID, {
      ...this.appUserForm.value,
      gender: this.appUserForm.value.gender.value,
      role: roles
    })
      .subscribe({
        next: response => {
          this.appUserService.userHTTPResponse = response;
          this.appUserForm.reset()
          this.appUserService.appUserRef.close()
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        }
      })
  }

  createUser(){
    const roles = this.appUserForm.value.role.map((role: { value: any }) => {
      return role.value;
    });

    this.appUserService.createUser({
        ...this.appUserForm.value,
        gender: this.appUserForm.value.gender.value,
        role: this.authService.role === "ROLE_ORG_ADMIN" ? roles : this.appUserForm.value.role,
      })
      .subscribe({
        next: response => {
          this.appUserService.userHTTPResponse = response;
          this.appUserForm.reset();
          this.appUserService.appUserRef.close();
        },
        error: err => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: `${err.error.message}` });
        }
      })
  }
}
