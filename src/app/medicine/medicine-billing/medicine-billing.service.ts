import { Injectable } from '@angular/core';
import {Patient} from "@models/patient";
import {Medicine} from "@models/medicine";

@Injectable({
  providedIn: 'root'
})
export class MedicineBillingService {

  filteredPatients!: Patient[];
  filteredMeds!: Medicine[];
  selectedMeds!: Medicine[];
  selectedPatient!: Patient;
  constructor() { }
}
