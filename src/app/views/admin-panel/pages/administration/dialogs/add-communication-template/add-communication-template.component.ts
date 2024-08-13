import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UploadFileComponent } from '@main/shared/components/inputs/file-upload/field-upload.component';

@Component({
  selector: 'app-add-communication-template',
  templateUrl: './add-communication-template.component.html',
  styleUrls: ['./add-communication-template.component.scss']
})
export class AddCommunicationTemplateComponent implements OnInit {
public addTemplateForm!: FormGroup;
  public file: File;
  public type: string[] = ["Email", "SMS", "Phone Calls", "Task", "Meeting"];  
  public tableID: string[] = ["User", "External Provider", "Client", "Service Schedule", "Lead", "Supplier Remittance"];
  public columns: string[] = ["id", "name", "createdby", "createdon", "modifiedby"];


  @ViewChild("upload", { static: false }) upload: UploadFileComponent;

  constructor(
    public dialogRef: MatDialogRef<AddCommunicationTemplateComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.addTemplateForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      type: ['', [Validators.required]],
      table_id: ['', [Validators.required]],
      template_text: ['', [Validators.required]],
      columns: [''],
      tags: [''],
    });
  }

  close() {
    this.dialogRef.close(null);
  }

  save(){
    if(this.addTemplateForm.valid){
      this.dialogRef.close(this.addTemplateForm.value);
    }
  }


  onUpload(file: any): void {
    this.addTemplateForm.get('image').setValue(file);
  }

}
