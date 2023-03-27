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
      name: "X-ray"
    },
    {
      id: 2,
      name: "CBC"
    },
    {
      id: 3,
      name: "Ultrasonography"
    },
    {
      id: 4,
      name: "CBS"
    }
  ];

  orgDiagnostics: {id: number, name: string, price: number}[] = [] ;

  ref!: DynamicDialogRef;

  editMode : boolean = false;

  constructor() { }

  ngOnInit(){

  }

  toggleEditMode(){
    this.editMode = !this.editMode;
  }

  appendValue(value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>){
    let extractedName: string;
    if(value.diagName.id){
      extractedName = value.diagName.name;
    }
    else{
      extractedName = value.diagName;
    }
    this.orgDiagnostics.push( {id: this.orgDiagnostics.length + 1, name: extractedName, price: value.diagPrice});

    this.ref.close();
  }

  updateValue(index: number, value: ɵTypedOrUntyped<any, ɵFormGroupValue<any>, any>){
    this.orgDiagnostics[index].name = value.diagName;
    this.orgDiagnostics[index].price = value.diagPrice;
    this.ref.close();
  }

  deleteValue(index: number){
    this.orgDiagnostics.splice(index, 1);
  }

}
