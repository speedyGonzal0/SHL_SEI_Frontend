import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OrgService} from "@shared/services/org.service";
import {HttpService} from "@shared/services/http.service";
import {RefreshService} from "@shared/services/refresh.service";
import {ApiPaths} from "@enums/api-paths";
import {AuthService} from "@authentication/auth.service";
import {Medicine} from "@models/medicine";

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.scss']
})
export class OrgProfileComponent implements OnInit{
  orgID!: number;
  medicines! : any;
  total! : number;
  orgAdminURL = ApiPaths.orgAdmin
  orgMedURL = ApiPaths.orgMed;
  orgDiagURL = ApiPaths.orgDiag;
  orgDocURL = ApiPaths.orgDoc;
  orgUsersURL = ApiPaths.users;
  activeIndex: number = 0;
  cardInfo = [
    {
      title: "Doctors",
      icon: "stethoscope",
      count: 123,
      activeIndex: 0,
    },
    {
      title: "Medicines",
      icon: "pill",
      count: 88,
      activeIndex: 1,
    },
    {
      title: "Diagnostics",
      icon: "ecg",
      count: 500,
      activeIndex: 2,
    },
    {
      title: "Employees",
      icon: "groups",
      count: 33,
      activeIndex: 3,
    },
  ]

  constructor(public orgService: OrgService, private route: ActivatedRoute,
              private httpService: HttpService,
              private refreshService: RefreshService,
              private authService: AuthService,
              private router: Router
              ) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.orgID = params['id'];
        this.orgService.getOrgByID(this.orgID)
      }
    )

    this.refreshService.refreshNeeded$
      .subscribe(() => {
        this.route.params.subscribe(
          (params: Params) => {
            this.orgID = params['id'];
            this.orgService.getOrgByID(this.orgID)
          }
        )
        }
      )
  }

  getData(index: number){
    this.activeIndex = index
    switch(this.activeIndex) {
      case 0:
        this.getOrgDoctors(this.orgID)
        break;
      case 1:
        this.getOrgMedicines(this.orgID)
        break;
      default:
      // code block
    }
  }

  getOrgInfo(orgID: number){
    this.httpService.getRequest(`${this.orgAdminURL}/dashboard/${orgID}`)
      .subscribe((response: any) => {
        this.cardInfo[0].count = response.orgDoctors
        this.cardInfo[1].count = response.orgMedicines
        this.cardInfo[2].count = response.orgDiagnostics
        this.cardInfo[3].count = response.orgEmployees
      })
  }

  getOrgMedicines(orgId: number){
    this.httpService
      .getRequest(`${this.orgMedURL}/organization/${orgId}/search`)
      .subscribe((response:any) => {
        this.medicines = response.content;
        this.total = response.totalElements;
      })
  }

  getOrgDiagnostics(orgId: number){
    this.httpService
      .getRequest(`${this.orgMedURL}/organization/${orgId}/search`)
      .subscribe((response:any) => {
        this.medicines = response.content;
        this.total = response.totalElements;
      })
  }

  getOrgDoctors(orgId: number){
    this.httpService
      .getRequest(`${this.orgMedURL}/organization/${orgId}/search`)
      .subscribe((response:any) => {
        this.medicines = response.content;
        this.total = response.totalElements;
      })
  }

  getOrgUsers(orgId: number){
    this.httpService
      .getRequest(`${this.orgMedURL}/organization/${orgId}/search`)
      .subscribe((response:any) => {
        this.medicines = response.content;
        this.total = response.totalElements;
      })
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
