import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HistoryService} from "../../history.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ToWords} from "to-words";

@Component({
  selector: 'app-medicine-details',
  templateUrl: './medicine-details.component.html',
  styleUrls: ['./medicine-details.component.scss']
})
export class MedicineDetailsComponent implements OnInit{
  @ViewChild('t', {static: false}) elem!:ElementRef
  id! : number;
  constructor(public historyService: HistoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.doctorService.getDoctorByID(this.route.snapshot.params['id'])
    this.route.params.subscribe(
      (params: Params) => {
        this.historyService.getMedHistoryByID(params['id'])

      }
    )
  }

  toWords(bill: number){
    const toWords = new ToWords({
      localeCode: 'en-BD',
      converterOptions: {
        currency: true,
        ignoreDecimal: false,
        ignoreZeroCurrency: false,
        doNotAddOnly: false,
        currencyOptions: { // can be used to override defaults for the selected locale
          name: 'Taka',
          plural: 'Taka',
          symbol: 'Taka',
          fractionalUnit: {
            name: 'Poisha',
            plural: 'Poisha',
            symbol: '',
          },
        }
      }});
    return toWords.convert(bill)
  }

  createPDF(action: string){

    import('jspdf').then((jsPDF) => {
      const doc = new jsPDF.default('p', 'pt', 'a4');
      doc.setProperties({
        title: "pharmacy_bill.pdf"
      });

      const width = doc.internal.pageSize.getWidth();

      doc.html(this.elem.nativeElement,{
        autoPaging: 'text',
        width: width,
        windowWidth: width,
        callback: () => {
          action === 'print' ? doc.output('dataurlnewwindow') : doc.save()
        }
      })
    });
  }
}
