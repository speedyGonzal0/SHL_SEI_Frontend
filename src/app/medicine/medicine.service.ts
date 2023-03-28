import { Injectable } from '@angular/core';
import {DynamicDialogRef} from "primeng/dynamicdialog";
import {ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class MedicineService {

  medicines = [
    {
      id: 1,
      name: "Napa",
      price: 5.00,
      formula: "Paracetamol",
      strength: "20mg",
      mfr: "Beximco"
    },
    {
      id: 2,
      name: "Ace",
      price: 5.00,
      formula: "Paracetamol",
      strength: "20mg",
      mfr: "Square"
    },
    {
      id: 3,
      name: "Roaccutane",
      price: 90.00,
      formula: "Isotretinoin",
      strength: "20mg",
      mfr: "Roche"
    },
    {
      id: 4,
      name: "Fexo",
      price: 9.00,
      formula: "Fexofanadine",
      strength: "60mg",
      mfr: "Square"
    }
  ];

  orgMedicines: {
    id: number,
    name: string,
    price: number,
    formula: string,
    strength: string,
    mfr: string
  }[] = [] ;

  ref!: DynamicDialogRef;

  editMode : boolean = false;

  constructor() { }

  ngOnInit(){

  }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  appendValue(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>){
    this.orgMedicines.push( {
      id: this.orgMedicines.length + 1,
      name: value.med.name,
      price: value.med.price,
      formula: value.med.formula,
      strength: value.med.strength,
      mfr: value.med.mfr
    });

    this.ref.close();
  }

  updateValue(index: number, value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>){
    this.orgMedicines[index].name = value.medName;
    this.orgMedicines[index].price = value.medPrice;
    this.ref.close();
  }

  deleteValue(index: number){
    this.orgMedicines.splice(index, 1);
  }

}
