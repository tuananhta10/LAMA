import { 
  Component, 
  OnInit, 
  OnDestroy,
  Input
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
  selector: 'admin-job',
  animations: [mainAnimations],
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss']
})
export class JobComponent implements OnInit {
  private adminProfile$: any;
  public loading: boolean = true;
  public adminData: any = {};

  radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public pmRequireApproval: boolean = false;
  public indigenous: boolean = false;

  constructor(private router:Router, 
    private spinner: NgxSpinnerService,
    public store: Store<AdminProfileState>,
    private adminService: AdminService) { 

    this.adminProfile$ = this.store.pipe(select(state => state));
  }

  ngOnInit(): void {
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
}
