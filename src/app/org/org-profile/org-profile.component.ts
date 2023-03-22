import { Component } from '@angular/core';

@Component({
  selector: 'app-org-profile',
  templateUrl: './org-profile.component.html',
  styleUrls: ['./org-profile.component.scss']
})
export class OrgProfileComponent {
  org = {
    id: 123,
    name: "Labaid Hospital",
    address: "House#06, Road#04, Dhanmondi, Dhaka 1205, Bangladesh",
    phone: "01715227710",
    email: "info@labaid.net",
    website: "www.labaid.com"
  }
}
