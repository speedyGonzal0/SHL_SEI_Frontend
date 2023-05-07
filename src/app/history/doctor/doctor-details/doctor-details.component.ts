import {Component, ElementRef, ViewChild} from '@angular/core';
import {HistoryService} from "@history/history.service";
import {ActivatedRoute, Params} from "@angular/router";
import {ToWords} from "to-words";

@Component({
  selector: 'app-doctor-details',
  templateUrl: './doctor-details.component.html',
  styleUrls: ['./doctor-details.component.scss']
})
export class DoctorDetailsComponent {
  @ViewChild('t', {static: false}) elem!:ElementRef
  id! : number;
  constructor(public historyService: HistoryService, private route: ActivatedRoute) {}

  ngOnInit() {
    // this.doctorService.getDoctorByID(this.route.snapshot.params['id'])
    this.route.params.subscribe(
      (params: Params) => {
        this.historyService.getDocHistoryByID(params['id'])

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
        currencyOptions: {
          name: 'Taka',
          plural: 'Taka',
          symbol: '৳',
          fractionalUnit: {
            name: 'Poisha',
            plural: 'Poisha',
            symbol: '',
          },
        }
      }
    });
    return toWords.convert(bill)
  }

  createPDF(action: string){

    import('jspdf').then((jsPDF) => {
      const doc = new jsPDF.default('p', 'pt', 'a3');
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
