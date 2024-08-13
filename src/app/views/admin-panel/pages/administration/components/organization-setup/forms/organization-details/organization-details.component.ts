import { 
  Component, 
  OnDestroy, 
  OnInit, 
  Input,
  Output,
  Inject,
  ChangeDetectorRef,
  AfterViewInit,
  EventEmitter,
  ViewChild
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DeleteRecordComponent } from '../../../../dialogs/delete-record/delete-record.component';
import { MatSnackBar } from '@angular/material/snack-bar';

import { 
  displayedColumns,
  TableHeader,
  BranchList,
  selectedColumns,
  branchList 
} from '../../utils/branches-model-interface';

import { 
  displayedIPColumns,
  WhiteList,
  selectedIPColumns,
  whiteList 
} from '../../utils/whitelist-model-interface';


@Component({
  selector: 'admin-organization-details',
  animations: [mainAnimations],
  templateUrl: './organization-details.component.html',
  styleUrls: ['./organization-details.component.scss']
})
export class OrganizationDetailsComponent implements OnInit, OnDestroy {
  @Input() branchList: any = branchList;
  @Input() organizationDetailsForm!: FormGroup;
  @Input() id: any;
  @Input() payroll_options: any[];
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  public ahCalculation: any[] = ["Shift Start", "Shift End", "Highest Rate"];
  public dateFormat:string[] = ["dd-MM-yyyy", "D-MM-yyyy", "d-MMM-yyy", "yyyy-M-d"];
  public timeFormat: string[] = ["24 Hours", "12 Hours AM/PM"];
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public invoiceTaxRateOptions: string[] = ['EXCLUSIVE','INCLUSIVE','NO TAX']
  public loading: boolean = true;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public routerUrl: any[] = [];
  public displayedColumns: TableHeader[] = displayedColumns;
  public selectedColumns: string[] = selectedColumns;
  public displayedIPColumns: TableHeader[] = displayedIPColumns;
  public whiteList: WhiteList[] = whiteList;
  public selectedIPColumns: string[] = selectedIPColumns;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      code: el.code,
      name: el.name
    }
  } 

  constructor(private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.isValid.emit({formStep: 1, isValid: this.organizationDetailsForm.valid})

    if(this.req) this.req.unsubscribe();
  }

  // delete event emitter
  deleteDataDialog(event){
    if(event){
      let cancellationPolicyDialog = this.dialog.open(
        DeleteRecordComponent,
        { 
          minWidth: '30vw',
          data: event?.data,
        }
      );
    }
  }

  editBranch(event){
    console.log(event)

    if(event){
      this.router.navigate([`/admin/setup/branch-setup/${event?.data?.id}`])
    }
  }
}
