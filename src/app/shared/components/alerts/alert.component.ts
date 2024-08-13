import { 
    Component,
    OnInit, 
    Input, 
    Output,
    EventEmitter,
    Inject
  } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
  import { mainAnimations } from '@app-main-animation';
  
  @Component({
    selector: 'app-alert',
    animations: [mainAnimations],
    templateUrl: './alert.component.html',
    styleUrls: ['./alert.component.scss']
  })
  export class AlertComponent {
  
    @Input() type: String = 'info';
    @Input() message: String = '';
    @Output() atClose: EventEmitter<any> = new EventEmitter<any>();

  
    constructor(
        @Inject(MAT_DIALOG_DATA) public data,
        public dialogRef: MatDialogRef<AlertComponent>,
    ) { }

    setClass(){
        let retClass = 'alert-info'
        if(this.type === 'danger'){
            retClass = 'alert-danger';
        } else if(this.type === 'warning'){
            retClass = 'alert-warning'
        } else if (this.type === 'success') {
            retClass = 'alert-success'
        }

        return retClass;
    }

    close(ret){
        this.dialogRef.close(ret);
    }
  }
  