import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RefreshService {

  public _refreshNeeded$ = new Subject<void>();

  userTable = new Subject();
  diagnosticTable = new Subject();
  doctorTable = new Subject();
  medTable = new Subject();
  orgTable = new Subject();
  patientTable = new Subject();

  get refreshNeeded$(){
    return this._refreshNeeded$;
  }

  updateUserTable(){
    this.userTable.next({});
  }

  updateDiagTable(){
    this.diagnosticTable.next({})
  }

  updateDocTable(){
    this.doctorTable.next({})
  }

  updateMedTable(){
    this.medTable.next({})
  }

  updateOrgTable(){
    this.orgTable.next({})
  }

  updatePatientTable(){
    this.patientTable.next({})
  }
}
