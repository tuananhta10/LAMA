import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute, Params, RoutesRecognized } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
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
import { finalize } from "rxjs/operators";
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';

@Component({
  selector: 'admin-side-profile',
  animations: [mainAnimations],
  templateUrl: './side-profile.component.html',
  styleUrls: ['./side-profile.component.scss']
})
export class SideProfileComponent implements OnInit {
  @Input() adminData: any = {};
  @Input() clientSideProfile: boolean = false;

  private assignCareworkerDialog: any = {
    assign: undefined,
    confirm: undefined,
    success: undefined
  };
  private clientsData$: any;
  private employeesData$: any;
  private req: Subscription;

  public employeeData: any[] = [];
  public defaultImage = '/assets/images/placeholder/client-hug.png';

  constructor(private clientListStore: Store<ClientListState>,
    private employeeListStore: Store<EmployeeListState>,
    private dialog: MatDialog,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  
}
