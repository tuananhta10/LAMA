import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { MatDialog } from '@angular/material/dialog';
import { CertificatesComponent } from '../../../dialogs/certificates/certificates.component';

interface Certificate{
  type: string,
  qualification: string,
  description: string,
  dateAdded: string,
  file: string

}

@Component({
  selector: 'employee-main-profile-details',
  animations: [mainAnimations],
  templateUrl: './main-profile-details.component.html',
  styleUrls: ['./main-profile-details.component.scss']
})
export class MainProfileDetailsComponent implements OnInit {
  @Input() employeeData: any = {};
  @Input() employeeDataMain: any = {};  
  
  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public smoker: boolean = false;
  public allergies: boolean = false;

  public certificateData: Certificate[] = [
    {
      type: "Education",
      qualification: "Degree",
      description: "Bachelor of Science in Psychology Degree",
      dateAdded: "09-12-2021",
      file: "test"
    },

    {
      type: "Experience",
      qualification: "Post Graduate Certificate",
      description: "Doctorate Certificate and Training",
      dateAdded: "09-12-2021",
      file: "test"
    },

    {
      type: "Certifications",
      qualification: "Certificate",
      description: "National Pyschology Association Certification",
      dateAdded: "09-12-2021",
      file: "test"
    },
  ]

  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
  }

  openAddCertificateDialog(){
    console.log("CLICK")

    // open edit column dialog
    const dialogRef = this.dialog.open(CertificatesComponent, {
      panelClass: "dialog-responsive",
      //width: '550px',
      data: {
        //employeeDetail: selectedEmployee
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      //this.dbClickActive = false;
      //this.selectRows(selectedEmployee);
      console.log('The dialog was closed',  /*this.dbClickActive*/ );
    });

  }


  parseArray(data): string[] {
    return data// ? eval(data) : '-'
  }
}
