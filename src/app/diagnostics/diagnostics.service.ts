import {Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";
import {DynamicDialogRef} from "primeng/dynamicdialog";

@Injectable({
  providedIn: 'root'
})
export class DiagnosticsService implements OnInit{

  diagnostics = [
    {
      id: 1,
      name: "X-ray",
      price: 500.00
    },
    {
      id: 2,
      name: "CBC",
      price: 400.00
    },
    {
      id: 3,
      name: "Ultrasonography",
      price: 600.00
    }
  ];

  ref!: DynamicDialogRef;

  editMode : boolean = false;

  constructor() { }

  ngOnInit(){

  }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  appendValue(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>){
    this.diagnostics.push( {id: this.diagnostics[this.diagnostics.length - 1].id + 1, name: value.diagName, price: value.diagPrice});
    this.ref.close();
  }

  updateValue(index: number, value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>){
    this.diagnostics[index].name = value.diagName;
    this.diagnostics[index].price = value.diagPrice;
    this.ref.close();
  }

  deleteValue(index: number){
    this.diagnostics.splice(index, 1);
  }

}
