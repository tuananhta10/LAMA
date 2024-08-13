import { Component, ElementRef, EventEmitter, forwardRef, Host, Input, OnInit, Optional, Output, SkipSelf, ViewChild } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Papa } from 'ngx-papaparse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-field-upload',
  templateUrl: './field-upload.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => UploadFileComponent),
      multi: true
    }
  ],
  styleUrls: ['./field-upload.component.scss']
})
export class UploadFileComponent implements ControlValueAccessor, OnInit {
  uploadedFile: any;
  uploadedFileBase64: any;
  fileType: string;

  @Input() label: string;
  @Input() required: any;
  @Input() disabled: boolean;
  @Input() formControlName: string;
  @Input() initialVal: string = '';
  @Input() labelTop: boolean = false;
  @Input() info: boolean = false;
  @Input() chips:boolean = true;
  @Input() infoTitle: string = 'Your title here';
  @Input() acceptType: string = "/*";
  @Input() subtitle: string = '';
  @Input() fileArray:any[] = [];
  @Input() isMultiple:boolean = false;
  @Input() row: string = 'col-sm-6';
  @Input() file: any;

  fileObject: any = {
    filename: '',
    size: '',
    type: '',
    file: ''
  }
  

  @Output() upload: EventEmitter<any> = new EventEmitter();
  @ViewChild('uploadFile') uploadInput: ElementRef;

  control: AbstractControl;
  isTouched: boolean = false;

  onChange: (value: any) => {};
  onTouched: () => {
  
  };

  @Output() keyevents: EventEmitter<any> = new EventEmitter<any>();
  protected _onChangeCallback: (_: any) => void = noop;

  constructor(private papa: Papa,
    private snackBar: MatSnackBar,) { }

  registerOnTouched(fn: any) {
    this._onChangeCallback = fn;
  }

	registerOnChange(fn: any) {
		this._onChangeCallback = fn;
	}

  onTouch(event){
    if(this.required && !event.target.value){
      this.isTouched = true;
    } else {
      this.isTouched = false;
    }
  }

  writeValue(value: any) {
    this._onChangeCallback(value);
  }

  onFileChangeEvent(event: any, dropped = false): void {
    this.snackBar.open('Checking file data type and size for inconsistency.', "", {
      //duration: 4000,
      panelClass:'success-snackbar'
    });

    const uploaded = dropped ? event : event.target.files;
    if (uploaded.length !== 0) {
      this.uploadedFile =  uploaded[0];
      this.fileObject.filename = uploaded[0].name;
      this.fileObject.type = uploaded[0].type;
      this.fileObject.size = uploaded[0].size
      const reader = new FileReader();
      reader.readAsDataURL(uploaded[0]);
      reader.onload = (_event) => {
        this.uploadedFileBase64 = reader.result;
        this.fileObject.file = reader.result; 
        this.writeValue(this.fileObject);
        this.upload.emit(this.fileObject);

        setTimeout(() => {
          this.snackBar.open('Successfully checked the file. You can now save your update.', "", {
            duration: 4000,
            panelClass:'success-snackbar'
          });
        }, 2000);
      }

      this.uploadInput.nativeElement.value = '';
    }
  }

  uploadMultiple(event: any, dropped = false) {
    const uploaded = dropped ? event : event.target.files;

    if (uploaded.length !== 0) {
      for (let i = 0; i < uploaded.length; i++) {
        
        let fileObject: any = {
          filename: '',
          size: '',
          type: '',
          file: ''
        }

        fileObject.filename = uploaded[i].name;
        fileObject.type = uploaded[i].type;
        fileObject.size = uploaded[i].size
        const reader = new FileReader();
        reader.readAsDataURL(uploaded[i]);
        reader.onload = (_event) => {
          fileObject.file = reader.result;
          this.fileArray.push(fileObject) 
          this.writeValue(this.fileArray);
          this.upload.emit(this.fileArray);
        }
      }
    }
  }

  removeImage(){
    this.uploadedFile = "";
    this.fileType = "";
    this.uploadedFileBase64 = "";
    this.writeValue("");
    this.upload.emit("");
  }

  removeImageInArray(i){
    this.fileArray.splice(i, 1)
    this.upload.emit(this.fileArray);
  }

  ngOnInit(): void {
    if(this.file){
      console.log(this.file)

      this.uploadedFile = this.file[0] || this.file?.attachment[0];
      this.uploadedFile.name = this.file[0]?.filename || this.file?.attachment[0]?.filename;
    }
  }
}
