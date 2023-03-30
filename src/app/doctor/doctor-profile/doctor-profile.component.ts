import {Component, OnInit} from '@angular/core';
import {DoctorService} from "@shared/services/doctor.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit{

  id! : number;
  doctor = {
    id: 123,
    name: "Renu Akter",
    phone: "01613887722",
    email: "renu@gmail.com",
    gender: "Female",
    specialities: ["Pediatrics", "Dermatology", "dasdsadsadda"],
    degrees: ["PhD (Glasgow)","FCPS (Glasgow)","MBBS (DMC)"]
  }

  colHeaders = ["Sa", "Su", "Mo", "Tu", "We", "Th", "Fr"]

  orgs : any = [
    {
    name: "Popular Hospital",
    days: ['0','1','0','1','1','0','0'],
    fees: [1000, 650, 500],
    },
    {
      name: "Apollo Hospital",
      days: ['0','1','0','0','0','0','1'],
      fees: [1200, 600, 800]
    },
  ]

  constructor(public doctorService: DoctorService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.doctorService.getDoctorByID(this.route.snapshot.params['id'])
    // this.route.params.subscribe(
    //   (params: Params) => {
    //     console.log(params['id'])
    //     this.doctorID = params['id'];
    //     if (this.doctorID){
    //       this.doctorService.getDoctorByID(this.doctorID)
    //     }
    //   }
    // )
    // this.route.paramMap.subscribe((params: ParamMap) => {
    //   console.log(params.get('id'));
    //   console.log(this.doctorService.getDoctorByID(this.doctorID))
    // });
  }

}
