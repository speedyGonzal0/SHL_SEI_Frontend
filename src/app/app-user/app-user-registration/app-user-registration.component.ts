import {Component, OnDestroy, OnInit} from '@angular/core';
import {DynamicDialogConfig} from "primeng/dynamicdialog";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppUserService} from "@shared/services/app-user.service";
import {AuthService} from "@authentication/auth.service";
import {Organization} from "@models/organization";
import {HttpService} from "@shared/services/http.service";
import {ApiPaths} from "@enums/api-paths";
import {NotificationService} from "@shared/components/notification/notification.service";
import {RefreshService} from "@shared/services/refresh.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-app-user-registration',
  templateUrl: './app-user-registration.component.html',
  styleUrls: ['./app-user-registration.component.scss'],
  providers: []

})
export class AppUserRegistrationComponent implements OnInit, OnDestroy{

  addressValue!: string
  constructor(public appUserService: AppUserService,
              private config: DynamicDialogConfig,
              public authService: AuthService,
              private httpService: HttpService,
              private refreshService: RefreshService,
              private notificationService: NotificationService
              ) {}

  appUserForm!: FormGroup;
  appUserEditID! : number;
  submitLabel = this.appUserService.editMode ? "Update" : "Confirm";
  organizations!: Organization[];
  role!: string;
  roleSub!: Subscription;

  ngOnInit() {
    this.roleSub = this.authService.userSourceInfo.subscribe( (value: any) => {
      this.role = value.role.toString();
    })
    // this.role = this.authService.getRole();

    this.appUserForm = new FormGroup({
      'name' : new FormControl(null, Validators.required),
      'phone' : new FormControl(null, [Validators.required, Validators.pattern(/(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/)]),
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'gender' : new FormControl(null, [Validators.required]),
      'address' : new FormControl(null, [Validators.required]),
      'age' : new FormControl(null, [Validators.required, Validators.min(1)]),
      'role' : new FormControl(this.role === "ROLE_ADMIN" ? 2 : null, [Validators.required]),
      'password' : new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]),
      'orgID' : new FormControl(null, [Validators.required]),
    }
    )

    if(this.role === "ROLE_ORG_ADMIN"){
      this.appUserForm.controls['orgID'].setValue(this.authService.orgID);
    }

    if(this.config.data) {
      let appUser : any = this.appUserService.appUsers[this.config.data.index];
      this.appUserForm.setValue({
        name: appUser.name,
        phone: appUser.phone,
        email: appUser.email.toLowerCase(),
        gender: this.appUserService.genders.find(
          (gender) =>
            gender.toLowerCase() === appUser.gender.toLowerCase()
        ),
        address: appUser.address,
        age: appUser.age,
        role: this.role !== 'ROLE_ADMIN' ?  this.appUserService.roles.filter(role => role.toLowerCase() === appUser.role[0].toLowerCase() ) : appUser.role,
        password: appUser.password,
        orgID: appUser.organization.id
      })
      this.addressValue = appUser.address;
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
    // const roles = this.appUserForm.value.role.map((role: { value: any }) => {
    //   return role.value;
    // });
    //
    // console.log(roles)
    // console.log(this.appUserForm.value)

    this.appUserService.editUser(this.appUserEditID, {
      ...this.appUserForm.value,
      role: [this.appUserForm.value.role].flat()
    })
      .subscribe({
        next: response => {
          this.notificationService.sendSuccessMessage("Edit Successful!")
          this.appUserForm.reset()
          this.refreshService.updateUserTable()
          this.appUserService.appUserRef.close()
        },
        error: err => {
          this.notificationService.sendErrorMessage(`${err.error.message}`);
        }
      })
  }

  createUser(){
    // const roles = this.appUserForm.value.role.map((role: { value: any }) => {
    //   return role.value;
    // });

    this.appUserService.createUser({
        ...this.appUserForm.value,
        gender: this.appUserForm.value.gender,
        role: [this.appUserForm.value.role],
        email: this.appUserForm.value.email.toLowerCase()
        // role: this.authService.role === "ROLE_ORG_ADMIN" ? roles : this.appUserForm.value.role,
      })
      .subscribe({
        next: response => {
          this.notificationService.sendSuccessMessage("Created Successfully!")
          this.appUserForm.reset();
          this.refreshService.updateUserTable();
          this.appUserService.appUserRef.close();
        },
        error: err => {
          this.notificationService.sendErrorMessage(`${err.error.message}` );
        }
      })
  }


  getOrg(e : any){
    let query = e.query;

    this.httpService.getRequestWithParams(`${ApiPaths.org}/search`, {query: query}).subscribe(
      (response:any) => this.organizations = response.content
    )
  }

  setOrgID(event: any){
    this.appUserForm.value.orgID = event.id;
  }

  ngOnDestroy() {
    this.roleSub.unsubscribe();
  }
}
