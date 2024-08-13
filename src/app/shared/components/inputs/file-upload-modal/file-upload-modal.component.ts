import { 
    Component,
    OnInit, 
    Input, 
    Output,
    EventEmitter,
    Inject
  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { mainAnimations } from '@app-main-animation';
import { Papa } from 'ngx-papaparse';
  
  @Component({
    selector: 'app-file-upload-modal',
    animations: [mainAnimations],
    templateUrl: './file-upload-modal.component.html',
    styleUrls: ['./file-upload-modal.component.scss']
  })
  export class FileUploadModalComponent {
  
    @Input() type: String = 'info';
    @Input() message: String = '';

    @Output() atClose: EventEmitter<any> = new EventEmitter<any>();
    uploadedFile: any;
    uploadedFileBase64: any;
    fileType: string;
    fileObject: any = {
      filename: '',
      size: '',
      type: '',
      file: ''
    }

    newCsv: any = {}

    csvConfig = {
      quotes: false, //or array of booleans
      quoteChar: '"',
      delimiter: ",",
      header: true,
      newline: "\r\n",
    }

    checking: boolean = true;
  
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        private snackBar: MatSnackBar,
        public dialogRef: MatDialogRef<FileUploadModalComponent>,
        private papa: Papa
    ) { }

    onFileChangeEvent(event: any, dropped = false): void {
      const uploaded = dropped ? event : event.target.files;
      let _this = this;

      this.checking = true;
      this.snackBar.open('Checking file data type for inconsistency.', "", {
        //duration: 4000,
        panelClass:'success-snackbar'
      });

      if(this.checkFile(uploaded[0].name)){
        if (uploaded.length !== 0) {
          this.uploadedFile =  uploaded[0];
          this.fileObject.filename = uploaded[0].name;
          this.fileObject.type = uploaded[0].type;
          this.fileObject.size = uploaded[0].size;
        
          this.papa.parse(uploaded[0],{
            complete: (result) => {
                let parsedData = {...result}
                parsedData.data.forEach((element, ind1) => {
                  element.forEach((data, ind2) => {
                    var ascii = /\uFFFD/g;
                    if ( data && ascii.test( data ) ) {
                      parsedData.data[ind1][ind2] = data.replace(/\uFFFD/g, "");
                    }
                  });
                });

                _this.newCsv = _this.papa.unparse(parsedData ,{
                  quotes: false, 
                  quoteChar: '"',
                  delimiter: ",",
                  header: true,
                  newline: "\r\n",
                })
                
                _this.readFile(_this.newCsv);
               
                setTimeout(() => {
                  this.snackBar.open('Successfully checked the file.', "", {
                    duration: 4000,
                    panelClass:'success-snackbar'
                  });
                  this.checking = false;
                }, 2000);

            }
          });
        }
      } else {
        this.snackBar.open("Unsupported file type please use only " + this.data.fileType, "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });

        this.checking = false
      }
    }

    checkFile(fileName): boolean{
      let ret = false;
      var extension = fileName.substr(fileName.lastIndexOf('.'));
      this.data.fileTypeArray.forEach(element => {
        if(element == extension){
          ret = true;
        }
      });

      return ret;
    }

    readFile(csv: any){
      var csvData = new Blob([csv], {type: 'text/csv;charset=utf-8;'});
      const reader = new FileReader();
      reader.readAsDataURL(csvData);
      reader.onload = (_event) => {
          this.uploadedFileBase64 = reader.result;
          this.fileObject.file = reader.result; 
      }
    }

    removeUnicode(str){
      return str.replace(/\\u[\dA-F]{4}/gi, (unicode) => {
        return String.fromCharCode(parseInt(unicode.replace(/\\u/g, ""), 16));
      });
  }

    removeFile(){
      this.uploadedFile = "";
      this.fileType = "";
      this.uploadedFileBase64 = "";
    }

    close(){
        this.dialogRef.close(null);
    }

    upload(){
      if(this.data?.forPricelist){
        this.dialogRef.close({
          ...this.data?.versionForm.value,  
          fileObject: this.fileObject
        })
      }

      else this.dialogRef.close(this.fileObject)
    }
  }
  