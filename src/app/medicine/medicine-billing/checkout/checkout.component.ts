import {Component} from '@angular/core';
import {HttpService} from "@shared/services/http.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent{
  medicines = [
    {
      id: 1,
      name: "Ace",
      generic: "xyz",
      strength: "5mg",
      quantity: 5,
      unit_price: 2,
      total_price: 10
    },
    {
      id: 2,
      name: "Fexo",
      generic: "xyz",
      strength: "8mg",
      quantity: 5,
      unit_price: 10,
      total_price: 50
    },
    {
      id: 3,
      name: "Advil",
      generic: "xyz",
      strength: "15mg",
      quantity: 10,
      unit_price: 3,
      total_price: 30
    },
  ]

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
  patient = {
    ID: 12345,
    name: "Ranu Akter",
    phone: "01715998810"
  }

  cols = [
    { field: 'name', header: 'Name' },
    { field: 'generic', header: 'Generic' },
    { field: 'strength', header: 'Strength' },
    { field: 'quantity', header: 'Qty' },
    { field: 'unit_price', header: 'Unit Price' },
    { field: 'total_price', header: 'Total Price' }
  ];

  constructor(private httpService: HttpService) {
  }

  calculateTotal(){
    return this.medicines.reduce((accumulator, object) => {
      return accumulator + object.total_price;
    }, 0)
  }

  applyDiscount(){
    this.discountAmount = Number(((this.discountPercent / 100) * this.calculateTotal()).toFixed(2))
    this.showDiscountInput = false
  }

  calculatePayable(){
    return this.calculateTotal() - this.discountAmount
  }

  cancelDiscount(){
    this.showDiscountInput = true
    this.discountPercent = 0
    this.discountAmount = 0
  }

  exportPdf(){
    let exportColumns = this.cols.map((col) => ({title: col.header, dataKey: col.field}));
    import('jspdf').then((jsPDF) => {
      import('jspdf-autotable').then((x) => {
        const doc = new jsPDF.default('p', 'px', 'a4');
        doc.setFontSize(10);
        doc.text([
          `Patient Name: ${this.patient.name}`,
          `Patient Phone: ${this.patient.phone}`,
          `Issued: ${this.issued}`,
          `Issued By: #${this.user.id}`
        ],30,40);
        (doc as any).autoTable(exportColumns, this.medicines, {theme: "grid", startY: 75});

        (doc as any).autoTable({
          columns: [
            { dataKey: 'name', header: '' },
            { dataKey: 'value', header: '' },
          ],
          body: [
            {name: "Total", value: `${this.calculateTotal()} BDT`},
            {name: "Discount", value: `-${this.discountAmount} BDT`},
            {name: "Payable", value: `${this.calculatePayable()} BDT`}
          ],
          theme: "plain",
          startY: 150
        })

        doc.save('products.pdf');
      });
    });
  }
  generateInvoice(){
    let medIDs : any = []
    let medQuantities : any = []
    this.medicines.map(item => {
      medIDs.push(item.id)
      medQuantities.push(item.quantity)
    })

    let medInvoice = {
      medQuantities: medQuantities,
      totalBill : this.calculateTotal(),
      discount : this.discountAmount,
      finalBill: this.calculatePayable()
    }
    console.log(medIDs)
    console.log(medInvoice)

    this.httpService.createRequest(
      `/pharmacyBill/med/${medIDs}/patient/1/org/1/appUser/1/add`,{
        ...medInvoice
      })
      .subscribe((response: any) => {
        console.log(response)
      })
  }
}
