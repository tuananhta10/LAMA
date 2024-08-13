import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { 
  displayedColumns,
  TableHeader,
  StaffWarning,
  selectedColumns,
  staffWarningList 
} from '../../utils/staff-warning-model-interface';

@Component({
  selector: 'employee-staff-warnings',
  animations: [mainAnimations],
  templateUrl: './staff-warnings.component.html',
  styleUrls: ['./staff-warnings.component.scss']
})
export class StaffWarningsComponent implements OnInit {
  private req: Subscription;
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public staffWarningList: StaffWarning[] = staffWarningList;
  public selectedColumns: string[] = selectedColumns
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      name: el.name,
      warning_number: el.warning_number,
      communicated_by: el.communicated_by,
      next_review: el.next_review,
      status: el.status,
    };
  }

  constructor(private employeeListStore: Store<EmployeeListState>,
    private router: Router,
    private route: ActivatedRoute) {
    // get id from parent route or url
    this.routerUrl = this.router.url.split('/');
    this.id = route.parent.snapshot.params['id'];

    console.log("SNAPSHOT", route.parent.snapshot.params['id'])
  }

  ngOnInit(): void {

    /*
      let transformed = {
        "age": el.age,
        "id": el.id,
        "first_name": el.first_name, 
        "last_name": el.last_name, 
        "name": `${el.first_name} ${el.last_name}`,
        "date_added": el.date_added,
        "email": el.email,
        "mobile_phone": el.mobile_phone_no,
        "work_phone": el.work_phone_no,
        "home_phone_no": el.home_phone_no,
        "suburb": el.suburb,
        "branch_name": el.branch_name,
        "state": el.state,
        "post_code": el.post_code,
        "preferred_gender": el.preferred_gender,
        "preferred_name": el.preferred_name,
        "type_of_service": el.type_of_service,
        "occupation": el.occupation,
        "primary_diagnosis": el.primary_diagnosis,
        "address": el.address,
        "status": el.status
      };

    */

    setTimeout(() => {
      this.loading = false;

   

    }, 1000);
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }


}
