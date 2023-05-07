import {Component, OnInit} from '@angular/core';
import {DoctorService} from "@shared/services/doctor.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class DoctorProfileComponent implements OnInit{

  id! : number;

  colHeaders = ["Sat", "Sun", "Mon", "Tue", "Wed", "Thu", "Fri"]

  orgs : any = [
    {
      name: "Popular Hospital",
      availableDayTimes: [
        {
          day: "Saturday",
          startTime: "03:05 PM",
          endTime: "05:05 AM"
        },
        {
          day: "Monday",
          startTime: "03:05 PM",
          endTime: "05:05 AM"
        }
      ],
      fees: [1000, 650, 500],
    },
    {
      name: "Apollo Hospital",
      availableDayTimes: [
        {
          day: "Saturday",
          startTime: "03:05 PM",
          endTime: "05:05 PM"
        },
        {
          day: "Sunday",
          startTime: "03:05 PM",
          endTime: "05:05 PM"
        },
        {
          day: "Monday",
          startTime: "03:05 PM",
          endTime: "05:05 PM"
        },
        {
          day: "Tuesday",
          startTime: "03:05 PM",
          endTime: "05:05 PM"
        },
        {
          day: "Wednesday",
          startTime: "03:05 PM",
          endTime: "05:05 PM"
        },
        {
          day: "Thursday",
          startTime: "03:05 PM",
          endTime: "05:05 PM"
        },
        {
          day: "Friday",
          startTime: "03:05 PM",
          endTime: "05:05 PM"
        }
      ],
      fees: [1200, 600, 800]
    },
  ]

  constructor(public doctorService: DoctorService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.doctorService.getDoctorByID(this.route.snapshot.params['id'])
    this.route.params.subscribe(
      (params: Params) => {
        this.doctorService.getDoctorByID(params['id'])
      }
    )
  }

}
