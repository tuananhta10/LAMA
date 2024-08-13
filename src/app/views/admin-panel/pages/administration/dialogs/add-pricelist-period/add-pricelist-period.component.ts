import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-pricelist-period',
  templateUrl: './add-pricelist-period.component.html',
  styleUrls: ['./add-pricelist-period.component.scss']
})
export class AddPricelistPeriodComponent implements OnInit {

  newPriceListPeriod!: FormGroup;
  pricelistOptions: any[] = [];
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];

  constructor(
    public dialogRef: MatDialogRef<AddPricelistPeriodComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) { 
    console.log(data)
    if(data){

      this.pricelistOptions = this.data.pricelist.map(el => {
        return {
          id: el.id,   
          name: el.name
        }
      });

      console.log(this.pricelistOptions, this.pricelistOptions.find(el => el.name === this.data?.details?.name))

    }
  }

  ngOnInit(): void {
    this.newPriceListPeriod = this.formBuilder.group({
      name: [this.data ? this.pricelistOptions.find(el => el.name === this.data?.details?.name)['id'] : '', [Validators.required]],
      effective_date_from: ['', [Validators.required]],
      effective_time_from: [''],
      effective_date_to: ['', [Validators.required]],
      effective_time_to: [''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.newPriceListPeriod.valid){
      this.dialogRef.close(this.newPriceListPeriod.value);
    }
  }

}
