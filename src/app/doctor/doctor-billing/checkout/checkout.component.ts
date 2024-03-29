import { Component } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {DoctorBillingService} from "@doctor/doctor-billing/doctor-billing.service";
import {AuthService} from "@authentication/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {

  discountPercent = 0;
  discountAmount : number = 0;
  showDiscountInput = true;
  issued = new Date()

  row = [{row: 1}]

  cols = ['#', 'Doctor ', 'Type', 'Time', 'Fee (BDT)'];

  constructor(private httpService: HttpService,
              public docBillService: DoctorBillingService,
              public authService: AuthService,
              private router: Router) {
  }

  applyDiscount(){
    this.discountAmount = Number(((this.discountPercent / 100) * this.docBillService.selectedAppointment.fee).toFixed(2))
    this.showDiscountInput = false
  }

  calculatePayable(){
    return this.docBillService.selectedAppointment.fee - this.discountAmount;
  }

  cancelDiscount(){
    this.showDiscountInput = true
    this.discountPercent = 0
    this.discountAmount = 0
  }

  isDisabled(value:number){
    return value == null || value<1 || value>100
  }

  // exportPdf(){
  //   let exportColumns = this.cols.map((col) => ({title: col.header, dataKey: col.field}));
  //   import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then((x) => {
  //       const doc = new jsPDF.default('p', 'px', 'a4');
  //       doc.setFontSize(10);
  //       doc.text([
  //         `Patient Name: ${this.patient.name}`,
  //         `Patient Phone: ${this.patient.phone}`,
  //         `Issued: ${this.issued}`,
  //         `Issued By: #${this.user.id}`
  //       ],30,40);
  //       (doc as any).autoTable(exportColumns, this.appointment, {theme: "grid", startY: 75});
  //
  //       (doc as any).autoTable({
  //         columns: [
  //           { dataKey: 'name', header: '' },
  //           { dataKey: 'value', header: '' },
  //         ],
  //         body: [
  //           {name: "Total", value: `${this.appointment[0].fee} BDT`},
  //           {name: "Discount", value: `-${this.discountAmount} BDT`},
  //           {name: "Payable", value: `${this.calculatePayable()} BDT`}
  //         ],
  //         theme: "plain",
  //         startY: 120
  //       })
  //
  //       doc.save(`${this.patient.ID}_DOCTOR_APPOINTMENT.pdf`);
  //     });
  //   });
  // }

  generateInvoice(){
    let doctorInvoice = {
      appointmentTime: this.docBillService.selectedTime,
      fee : this.docBillService.selectedAppointment.fee,
      type : this.docBillService.selectedAppointment.value,
      discount : this.discountPercent,
      finalFee : this.calculatePayable() + (this.calculatePayable()*5)/100
    }

    // console.log(doctorInvoice)

    this.httpService.createRequest(
      `/appointmentBill/appuser/${this.authService.appUserID}/orgDoc/${this.docBillService.selectedDoc.id}/patient/${this.docBillService.selectedPatient.id}/org/${this.authService.orgID}/add`,{
        ...doctorInvoice
      })
      .subscribe((response: any) => {
        this.router.navigate(['/history/doctor-appointment',response.id])
      })

    // this.exportPdf()
  }
}
