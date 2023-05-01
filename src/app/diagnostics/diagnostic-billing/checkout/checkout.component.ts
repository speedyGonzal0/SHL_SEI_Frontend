import { Component } from '@angular/core';
import {HttpService} from "@shared/services/http.service";
import {MedicineBillingService} from "@medicine/medicine-billing/medicine-billing.service";
import {DiagnosticBillingService} from "@diagnostics/diagnostic-billing/diagnostic-billing.service";
import {AuthService} from "@authentication/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent {
  diagnostics = [
    {
      id: 1,
      name: "CBC",
      price: 2000,
      final_price: 2000,
      discount: 0,
      discountApplied: false
    },
    {
      id: 2,
      name: "X-ray",
      price: 1500,
      final_price: 1500,
      discount: 0,
      discountApplied: false
    },
    {
      id: 3,
      name: "Ultrasono",
      price: 3700,
      final_price: 3700,
      discount: 0,
      discountApplied: false
    },
  ]

  diagInvoice = {
    orgDiagnosticAndDiscounts : [{orgDiagnosticId: 0, discount: 0}],
    totalFeeWithoutAnyDiscount : 0,
    totalFeeAfterIndividualDiscount : 0,
    overallDiscount : 0,
    finalFeeAfterAllDiscount : 0,
    appUserId : 0,
    patientId : 0,
    organizationId: 0
  }

  discountPercent! : number;
  discountAmount : number = 0;
  showDiscountInput = true;
  issued = new Date()

  user = {
    name: "Mr. Azmal",
    id: 456
  }
  org = {
    name: "Labaid Hospital ",
    id: 123
  }

  cols = [
    { field: 'serviceName', header: 'Name' },
    { field: 'price', header: 'Price (BDT)' },
    { field: 'discount', header: 'Discount (%)' },
    { field: 'final_price', header: 'Final Price (BDT)' },
  ];

  constructor(private httpService: HttpService,
              public diagBillService: DiagnosticBillingService,
              private authService: AuthService,
              private router: Router) {}

  applyIndividualDiscount(index: number, finalPrice:number, discount:number){
    let diagnostic : any = this.diagBillService.selectedDiagnostics[index]
    diagnostic.final_price = finalPrice - ((finalPrice * discount)/100)
    diagnostic.discountApplied = true;
  }

  cancelIndividualDiscount(index:number){
    let diagnostic:any = this.diagBillService.selectedDiagnostics[index]
    diagnostic.discountApplied = false
    diagnostic.discount = 0
    diagnostic.final_price = diagnostic.price
    this.cancelDiscount()
  }

  calculateTotal(){
    return this.diagBillService.selectedDiagnostics.reduce((accumulator, object:any) => {
      return accumulator + object.price;
    }, 0)
  }

  calculateAfterTotalIndividualDiscount(){
    return this.diagBillService.selectedDiagnostics.reduce((accumulator, object:any) => {
      return accumulator + object.final_price;
    }, 0)
  }

  applyDiscount(){
    this.discountAmount = Number(((this.discountPercent / 100) * this.calculateAfterTotalIndividualDiscount()).toFixed(2))
    this.showDiscountInput = false
  }

  calculatePayable(){
    return this.calculateAfterTotalIndividualDiscount() - this.discountAmount
  }

  cancelDiscount(){
    this.showDiscountInput = true
    this.discountPercent = 0
    this.discountAmount = 0
  }

  isDisabled(value: number){
    return value == null || value < 1 || value>100
  }

  // exportPdf(){
  //   let exportColumns = this.cols.map((col) => ({title: col.header, dataKey: col.field}));
  //   import('jspdf').then((jsPDF) => {
  //     import('jspdf-autotable').then((x) => {
  //       const doc = new jsPDF.default('p', 'px', 'a4');
  //       doc.setFontSize(10);
  //       doc.text([
  //         `Patient Name: ${this.diagBillService.selectedPatient.name}`,
  //         `Patient Phone: ${this.diagBillService.selectedPatient.phone}`,
  //         `Issued: ${this.issued}`,
  //         `Issued By: #${this.user.id}`
  //       ],30,40);
  //       (doc as any).autoTable(exportColumns, this.diagBillService.selectedDiagnostics, {theme: "grid", startY: 75});
  //
  //       (doc as any).autoTable({
  //         columns: [
  //           { dataKey: 'name', header: '' },
  //           { dataKey: 'value', header: '' },
  //         ],
  //         body: [
  //           {name: "Total", value: `${this.calculateAfterTotalIndividualDiscount()} BDT`},
  //           {name: "Discount", value: `-${this.discountAmount} BDT`},
  //           {name: "Payable", value: `${this.calculatePayable()} BDT`}
  //         ],
  //         theme: "plain",
  //         startY: 150
  //       })
  //
  //       doc.save(`${this.diagBillService.selectedPatient.id}_diagnostic_bill.pdf`);
  //     });
  //   });
  // }

  generateInvoice(){
    this.diagBillService.selectedDiagnostics.map((item:any) => {
      this.diagInvoice
        .orgDiagnosticAndDiscounts
        .push({orgDiagnosticId: item.id, discount: item.discount})
    })

    console.log("discount", this.discountAmount)

    this.diagInvoice.totalFeeWithoutAnyDiscount = this.calculateTotal()
    this.diagInvoice.totalFeeAfterIndividualDiscount = this.calculateAfterTotalIndividualDiscount()
    this.diagInvoice.overallDiscount = this.discountPercent
    this.diagInvoice.finalFeeAfterAllDiscount = this.calculatePayable() + (this.calculatePayable()*5)/100
    this.diagInvoice.appUserId = this.authService.appUserID
    this.diagInvoice.patientId = this.diagBillService.selectedPatient.id
    this.diagInvoice.organizationId = this.authService.orgID
    this.diagInvoice.orgDiagnosticAndDiscounts = this.diagInvoice.orgDiagnosticAndDiscounts.slice(1)

    this.httpService.createRequest(
      `/diagnostic-bill/add`,{
        ...this.diagInvoice
      })
      .subscribe((response: any) => {
        this.router.navigate(['/history/diagnostic', response.id])
      })

    // this.exportPdf()
  }
}
