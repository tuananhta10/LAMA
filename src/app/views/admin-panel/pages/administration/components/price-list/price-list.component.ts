import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import {
  Subscription,
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import {
  select,
  Store
} from '@ngrx/store';
import {
  displayedColumns,
  TableHeader,
  PriceList,
  selectedColumns,
  pricelistList
} from '../../utils/pricelist-model-interface-2';

import {
  displayedColumnsTTP,
  TableHeaderTTP,
  PriceListTTP,
  selectedColumnsTTP,
  pricelistListTTP
} from '../../utils/pricelist-model-interface-ttp';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatePriceListComponent } from '../../dialogs/update-price-list/update-price-list.component';
import { DeleteRecordComponent } from '../../dialogs/delete-record/delete-record.component';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Subject } from 'rxjs';
import { map, startWith, takeUntil } from 'rxjs/operators';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileUploadModalComponent } from '@main/shared/components';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { PriceListService } from '@main/shared/services/admin-panel/admin-price-list.service';

@Component({
  selector: 'app-price-list',
  animations: [mainAnimations],
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.scss']
})
export class PriceListComponent implements OnInit, OnDestroy {
  private priceList$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public pricelistList: PriceList[] = [];
  public selectedColumns: string[] = selectedColumns;

  public displayedColumnsTTP: TableHeaderTTP[] = displayedColumnsTTP;
  public pricelistListTTP: PriceListTTP[] = [];
  public selectedColumnsTTP: string[] = selectedColumnsTTP;
  public version: any;
  public totalRow: any;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      service_type_support_item_number: el.service_type_support_item_number,
      service_type_support_item_name: el.service_type_support_item_name,
      rate_type: el.rate_type,
      standard_rate: el.standard_rate,
      afternoon_rate: el.afternoon_rate,
      evening_rate: el.evening_rate,
      night_rate: el.night_rate,
      saturday_rate: el.saturday_rate,
      sunday_rate: el.sunday_rate,
      public_holiday_rate: el.public_holiday_rate,
    }
  }
  public isTTP: boolean = false;
  public rateType: any = {
    "E": "Fixed Rate",
    "H": "Hourly Rate",
    "D": "Per Day",
    "WK": "Per Week",
    "YR": "Per Year"
  }

  constructor(private adminPriceList: Store<AdminProfileState>,

    private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private formBuilder: FormBuilder,
    private priceListService: PriceListService,) {
      this.id = route.parent.snapshot.params['id'];
  }


  ngOnInit(): void {
    this.priceList$ = this.adminPriceList.pipe(select(state => state.priceList));
    this.getPriceList();

    this.req = this.priceList$.subscribe((priceList: any) => {      
      setTimeout(() => this.loading = priceList.pending, 0)
      if (priceList.priceListList.records !== undefined) {
        this.pricelistList = priceList.priceListList.records/*.filter(el => el?.service_type_registration_group_number == 104);*/
        //this.pricelistListTTP = priceList.priceListList.filter(el => el?.service_type_registration_group_number == 104);
        this.pricelistListTTP = priceList.priceListList.records;
        this.totalRow = priceList.priceListList.total_record_count;
        [...this.pricelistList].forEach((el => {
          el["rate_type"] = el["service_type_unit"].split(/(?=[A-Z])/g).join(' ');
        }));

        [...this.pricelistListTTP].forEach((el => {
          el["rate_type"] = el["service_type_unit"].split(/(?=[A-Z])/g).join(' ');
        }));
      }

      if (priceList.success) {
        this.getPriceList();

        this.adminPriceList.dispatch({
          type: PriceListActionTypes.SAVE_PRICE_LIST_SUCCESS,
          payload: { message: null }
        });
      }

      if (priceList.error) {
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass: 'danger-snackbar'
        });

        this.adminPriceList.dispatch({
          type: PriceListActionTypes.SAVE_PRICE_LIST_FAIL,
          payload: null
        });
      }

      if (priceList.priceListUpload) {
        if (priceList.priceListUpload.result.toLowerCase() === 'failed') {
          this.snackBar.open(priceList.priceListUpload.message, "", {
            duration: 4000,
            panelClass: 'error-snackbar'
          });
        } else {
          this.snackBar.open('Successfully uploaded price list', "", {
            duration: 4000,
            panelClass: 'success-snackbar'
          });
        }

        this.adminPriceList.dispatch({
          type: PriceListActionTypes.UPLOAD_PRICE_LIST_SUCCESS,
          payload: null
        });
      }
    })
  }

  getPriceList() {
    this.adminPriceList.dispatch({
      type: PriceListActionTypes.GET_PRICE_LIST_LIST
    });
  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('serviceLocation');
    if (this.req) this.req.unsubscribe();
  }

  // edit event emitter
  editDataDialog(event) {
    if (event) {
      this.openUpdatePricelist(event?.data);
    }
  }

  // delete event emitter
  deleteDataDialog(event) {
    if (event) {
      let deleteDialog = this.dialog.open(
        DeleteRecordComponent,
        {
          minWidth: '30vw',
          data: event?.data,
        }
      );

      deleteDialog
        .afterClosed()
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(result => {
          if (result?.data) {
            // delete integration here 
            // after delete refresh store
            //console.log("DATA WILL BE DELETED", result?.data)
          }
        });
    }
  }

  openUpdatePricelist(data?: any) {
    let updatePriceDialog = this.dialog.open(
      UpdatePriceListComponent,
      {
        minWidth: '40vw',
        data: {
          details: data,
          isTTP: this.isTTP,
          pricelist: pricelistList
        },
      }
    );

    updatePriceDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });
  }

  public versionForm!: FormGroup;

  uploadFileDialog() {
    this.versionForm = this.formBuilder.group({
      version: [''],
      effective_date: [''],
    });

    let uploadDialog = this.dialog.open(
      FileUploadModalComponent,
      {
        minWidth: '30vw',
        data: {
          fileType: '.csv',
          fileTypeArray: ['.csv'],
          forPricelist: true,
          versionForm: this.versionForm
        },
      }
    );

    uploadDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (result) {
          let data = {
            endpoint: 'support-catalogue',
            delete: true,
            effective_date: convertTimestampUtc(result?.effective_date),
            version: result?.version,
            attachment: result?.fileObject
          }

          this.snackBar.open("Upload in-progress. Please don't change the page while upload is in progress.", "", {
            panelClass: 'success-snackbar'
          });

          this.adminPriceList.dispatch({
            type: PriceListActionTypes.UPLOAD_PRICE_LIST,
            payload: data
          });
        }
      });
  }


}
