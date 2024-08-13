import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';
import { Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-line-item',
  templateUrl: './add-invoice-line-item.component.html',
  styleUrls: ['./add-invoice-line-item.component.scss']
})
export class AddLineItemComponent implements OnInit {
  private lineItem$: any;
  private req: Subscription;
  loading: boolean = false;

  public addLineItemForm!: FormGroup;
  public file: File;
    
  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddLineItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder,
    private adminLineItem: Store<AdminProfileState>,
  ) { 
    console.log(this.data)
  }

  ngOnInit(): void {
    this.addLineItemForm = this.formBuilder.group({
      Description: ['', [Validators.required]],
      Quantity: ['', [Validators.required]],
      UnitAmount: ['', [Validators.required]],
      AccountCode: ['', [Validators.required]],
      TaxType: ['', [Validators.required]],
      LineAmount: ['', [Validators.required]],
    });
    this.file = this.data ? this.data.icon : null;
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){

    if(this.addLineItemForm.valid){
      this.dialogRef.close(this.addLineItemForm.value);
    }
  }

}
