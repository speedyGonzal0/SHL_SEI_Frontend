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
  doctors! : any;
  users! : any;
  diagnostics! : any;
  total! : number;
  orgMedURL = ApiPaths.orgMed;
  orgDiagURL = ApiPaths.orgDiag;
  orgDocURL = ApiPaths.orgDoc;
  orgUsersURL = ApiPaths.users;
  activeIndex: number = 0;

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
        this.getOrgMedicines(this.orgID)
        this.getOrgUsers(this.orgID)
        this.getOrgDiagnostics(this.orgID)
        this.getOrgDoctors(this.orgID)
      }
    )

    this.refreshService.refreshNeeded$
      .subscribe(() => {
        this.route.params.subscribe(
          (params: Params) => {
            this.orgID = params['id'];
            this.orgService.getOrgByID(this.orgID)
            this.getOrgMedicines(this.orgID)
            this.getOrgUsers(this.orgID)
            this.getOrgDiagnostics(this.orgID)
            this.getOrgDoctors(this.orgID)
          }
        )
        }
      )
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
      .getRequest(`${this.orgDiagURL}/organization/${orgId}/search`)
      .subscribe((response:any) => {
        this.diagnostics = response.content;
        this.total = response.totalElements;
      })
  }

  getOrgDoctors(orgId: number){
    this.httpService
      .getRequest(`${this.orgDocURL}/org/${orgId}/search`)
      .subscribe((response:any) => {
        this.doctors = response.content;
        this.total = response.totalElements;
      })
  }

  getOrgUsers(orgId: number){
    this.httpService
      .getRequest(`${this.orgUsersURL}/org/${orgId}/search`)
      .subscribe((response:any) => {
        this.users = response.content;
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
