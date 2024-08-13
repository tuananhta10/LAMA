import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { MatDialog } from '@angular/material/dialog';
import { CertificatesComponent } from '../../../dialogs/certificates/certificates.component';
import { 
  Router, 
  ActivatedRoute,
} from '@angular/router';

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
  @Input() id: any;
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

  constructor(public dialog: MatDialog,
    private router: Router,  
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.smoker = this.employeeData?.smoker || false;  
    this.allergies = this.employeeData?.allergies || false;
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

  navigateTo(step){
    sessionStorage.setItem('employeeFormStep', `${step}`);
    this.router.navigate([`/admin/employees/edit/${this.employeeData?.id}`]);

    /*routerLink="/admin/clients/details/{{clientData?.id}}/goals"*/
  }

  parseArray(data): any[] {
    if(data && !data.toString().match('delim'))
      return data?.length > 0 ? data?.join(', ') : data;

    else return data
  }
}
