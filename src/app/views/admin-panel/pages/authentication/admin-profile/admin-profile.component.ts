import { 
  Component, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from '@app-services/admin-panel/admin.service';
import { mainAnimations } from '@app-main-animation';
import { Subscription } from 'rxjs';
import { NgxSpinnerService } from "ngx-spinner";
import { 
  select, 
  Store 
} from '@ngrx/store';
import { 
  // AdminProfileState,
  AdminProfileActionTypes 
} from '@app-admin-store/actions/admin-profile.action';
import { AdminProfileState } from '@app-admin-store/reducers/admin-profile.reducer';

@Component({
  selector: 'app-admin-profile',
  animations: [mainAnimations],
  templateUrl: './admin-profile.component.html',
  styleUrls: ['./admin-profile.component.scss']
})
export class AdminProfileComponent implements OnInit {
  private adminProfile$: any;
  public loading: boolean = true;
  public adminData: any = {};


  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public pmRequireApproval: boolean = false;
  public indigenous: boolean = false;

  /* BAR CHART */
  public barChartOptions: any = {
    responsive: true,
    //indexAxis: 'y' 
  };
  
  public barChartType: any = 'bar';
  public barChartLegend = true;

  public barChartData: any[] = [
    { 
      data: [12, 45, 75, 56, 75], 
      label: 'Approved', 
      stack: 'a', 
      backgroundColor: 'rgba(140, 127, 249, 1)', 
      borderWidth: 2, 
      borderColor: 'rgba(140, 127, 249, 1)', 
      barThickness: 25,
      //borderRadius: 200 
    },
    { 
      data: [45, 40, 33, 42, 23], 
      label: 'Accepted', 
      stack: 'a', 
      backgroundColor: 'rgba(27, 168, 223, 1)', 
      borderWidth: 2, 
      borderColor: 'rgba(27, 168, 223, 1)', 
      barThickness: 25,
      //borderRadius: 200 
    },
    { 
      data: [55, 65, 25, 10, 44], 
      label: 'Open', 
      stack: 'a', 
      backgroundColor: 'rgba(254, 192, 64, 1)', 
      borderWidth: 2, 
      borderColor: 'rgba(254, 192, 64, 1)', 
      barThickness: 25,
      //borderRadius: 200  
    },
    { 
      data: [33, 22, 44, 33, 14], 
      label: 'In Progress',
      stack: 'a',
      backgroundColor: 'rgba(73, 220, 88, 1)', 
      //borderWidth: 2, 
      borderColor: 'rrgba(73, 220, 88, 1)', 
      barThickness: 25,
      //borderRadius: 50 
    },
  ];
  public barChartLabels: string[] = ['Sydney', 'Melbourne', 'Devonport', 'Winton', 'Burnie'];

  /* BAR CHART 2 */
  public barChartOptions2: any = {
    responsive: true,
    indexAxis: 'y' 
  };
  public barChartType2: any = 'bar';
  public barChartLegend2 = true;

  public barChartData2: any[] = [
    { data: [125, 35, 44], label: 'Approved', backgroundColor: 'rgba(140, 127, 249, 1)'},
    { data: [25, 44, 65], label: 'Accepted', backgroundColor: 'rgba(254, 192, 64, 1)'},
    { data: [35, 75, 55], label: 'Open', backgroundColor: 'rgba(64, 187, 234, 1)'},
    { data: [45, 77, 88], label: 'In Progress' },
  ];
  public barChartLabels2: string[] = ['Sydney', 'Melbourne', 'Devonport'];
  
  constructor(private router:Router, 
    private spinner: NgxSpinnerService,
    public store: Store<AdminProfileState>,
    private adminService: AdminService) { 

    this.adminProfile$ = this.store.pipe(select(state => state));
    
  }

  ngOnInit(): void {
    // Use store instead of regular subscription
    /*this.store.dispatch({
      type: AdminProfileActionTypes.GET_ADMIN_PROFILE
    });*/

    this.adminProfile$.subscribe((data: any) => {
      this.adminData = data?.admin?.adminProfile;

      setTimeout(() => {
        if(this.adminData){
          
          //console.log("ADMIN DATA UPDATED", this.adminData);

          this.adminData = {  
            "id": 324234444123,
            "title": "Mr",
            "occupation": "Administrator",
            "profile_image": "/assets/images/faces/face-1.jpg",
            "interests": ["Games", "Books"],
            "hobbies": ["Video Games", "Baking"],
            "skills": ["Support", "Team Player"],
            "last_name": "Cruz",
            "first_name": "Juan",
            "birthdate": "04-05-1990",
            "birthplace": "Sydney",
            "branch_name": "District 22 Melbourne",
            "main_branch_id": 23995,
            "age": 25,
            "date_added": "08-01-2021",
            "email": "carl_smith@gmail.com",
            "home_phone_no": "715-2544123",
            "mobile_phone_no": "654-455751",
            "work_phone_no": "554-4781522",
            "suburb": "East Perth",
            "state": "East Coast Sydney",
            "pm_require_approval": "1",
            "post_code": "1231",
            "preferred_careworker_id": 1,
            "preferred_gender": "Male",
            "preferred_language_id": 1,
            "preferred_name": "Administrator",
            "primary_diagnosis": "Anxiety",
            "address": "admin@lama-care.com",
            "type_of_service": "Administrator"
          };
        }

        this.loading = !data?.pending ? false : true;
      }, 1000)
    });
  }

  ngOnDestroy(): void {
    
  }
}
