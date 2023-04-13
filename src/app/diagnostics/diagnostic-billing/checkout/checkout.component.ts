import { Component } from '@angular/core';

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
      discount: null,
      discountApplied: false
    },
    {
      id: 2,
      name: "X-ray",
      price: 1500,
      final_price: 1500,
      discount: null,
      discountApplied: false
    },
    {
      id: 3,
      name: "Ultrasono",
      price: 3700,
      final_price: 3700,
      discount: null,
      discountApplied: false
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
    { field: 'price', header: 'Price (BDT)' },
    { field: 'discount', header: 'Discount (%)' },
    { field: 'final_price', header: 'Final Price (BDT)' },
  ];

  applyIndividualDiscount(index: number, finalPrice:number, discount:number){
    let diagnostic = this.diagnostics[index]
    diagnostic.final_price = finalPrice - ((finalPrice * discount)/100)
    diagnostic.discountApplied = true;
  }

  cancelIndividualDiscount(index:number){
    let diagnostic = this.diagnostics[index]
    diagnostic.discountApplied = false
    diagnostic.discount = null
    diagnostic.final_price = diagnostic.price
    this.cancelDiscount()
  }

  calculateTotal(){
    return this.diagnostics.reduce((accumulator, object) => {
      return accumulator + object.final_price;
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

  isDisabled(value: number){
    return value == null || value < 1 || value>100
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
        (doc as any).autoTable(exportColumns, this.diagnostics, {theme: "grid", startY: 75});

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
}
