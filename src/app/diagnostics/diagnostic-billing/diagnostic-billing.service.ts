import { Injectable } from '@angular/core';
import {Patient} from "@models/patient";
import {Diagnostic} from "@models/diagnostic";
import {FormControl} from "@angular/forms";
import {ApiPaths} from "@enums/api-paths";

@Injectable({
  providedIn: 'root'
})
export class DiagnosticBillingService {

  filteredPatients!: Patient[];
  filteredDiagnostics!: Diagnostic[];

  selectedPatient!: Patient;
  selectedDiagnostics!: Diagnostic[];
  constructor() { }
}
