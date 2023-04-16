import { Injectable } from '@angular/core';
import {Patient} from "@models/patient";
import {Doctor} from "@models/doctor";

@Injectable({
  providedIn: 'root'
})
export class DoctorBillingService {

  filteredPatients!: Patient[];
  filteredDocs!: any;
  selectedPatient!: Patient;
  selectedDoc!: Doctor;
  selectedTime!: Date;
  appointmentOptions!: any[];
  selectedAppointment!: string;
  constructor() { }
}
