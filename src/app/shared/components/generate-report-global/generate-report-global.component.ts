import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { MatDialog } from '@angular/material/dialog';
import { StepModel } from '@main/shared/components/stepper/model';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { Subscription } from 'rxjs';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SelectGroupGlobalComponent } from '../select-group-global/select-group-global.component';
import { format,isValid, parseISO } from 'date-fns';
import * as moment from 'moment'; 

@Component({
  selector: 'app-generate-report-global',
  templateUrl: './generate-report-global.component.html',
  styleUrls: ['./generate-report-global.component.scss']
})
export class GenerateReportGlobalComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  public displayedColumns: any[];
  public selectedColumns: any[];
  public optionGroup!: FormGroup;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public tempGroup: any;
  
  constructor(
    public dialogRef: MatDialogRef<GenerateReportGlobalComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private excelService: ExcelDownloaderService,
    private adminIncident: Store<AdminProfileState>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { 
    console.log(data)
  }

  public test = {
    id: 1, 
    name: 'test'
  }

  insertToArr( index, items, arr ) {
    return arr.splice( index, 0, ...items );
  };

  ngOnInit(): void {
    this.displayedColumns = this.data?.displayedColumns;  
    this.selectedColumns = this.data?.selectedColumns;

    this.optionGroup = this.formBuilder.group({
      showGroup: [this.data?.groupItems],
    });

    this.tempGroup = this.data.groupBy;

    this.optionGroup.controls['showGroup'].valueChanges.subscribe((result) => {
      if(result === true){
        this.data.groupItems = true;
        this.data.groupBy = this.tempGroup;
        this.data.dateSearch.dateFrom = this.data?.activeDateFilter?.dateFrom || undefined;
        this.data.dateSearch.dateTo = this.data?.activeDateFilter?.dateTo || undefined;
        this.generateReport();
      }

      else if(result === false) {
        this.data.groupItems = false;
        this.data.groupBy = undefined;
        this.data.dateSearch.dateFrom = this.data?.activeDateFilter?.dateFrom || undefined;
        this.data.dateSearch.dateTo = this.data?.activeDateFilter?.dateTo || undefined;
        this.generateReport();
      }
    });
  }

  public generatedData: any[] = [];
  public generatedColumn: any[] = [];
  public grouping: any[] = [];
  public filteredGrouping: any[] = [];
  public loading: boolean = false;
  public downloading: boolean = false;

  updateDateFilter(event){
    /* OPTION FOR EXPORTING DATA */
    let data = [...this.data?.data_list].map((el) => this.getModifyObject(el));
    let columns = this.displayedColumns.filter(el => this.selectedColumns.indexOf(el.col_name) > -1).map(el => el.title);
    
    const filterBy = data?.filter(el => {
      if(this.data?.dateSearch?.dateFrom !== this.data?.filterBy){
        let dateFilter = moment(el[this.data?.filterBy], "DD/MM/YYYY").toDate();
        let dateFrom = isValid(this.data?.dateSearch?.dateFrom) ? new Date(this.data?.dateSearch?.dateFrom) : undefined;   
        let dateTo = isValid(this.data?.dateSearch?.dateTo)  ? new Date(this.data?.dateSearch?.dateTo) : undefined;   

        console.log(dateFrom, dateTo, dateFilter)

        if(dateFrom && dateTo){
          console.log("RETURN FULL")
          return dateFilter >= dateFrom && dateFilter <= dateTo
        }

        else if(dateFrom && !dateTo/* !== this.data?.filterBy*/){
        console.log("RETURN")
          return dateFilter >= dateFrom;
        }

        else if(!dateFrom /*!== this.data?.filterBy */&& dateTo){
        console.log("RETURN")
          return dateFilter <= dateTo;
        }

        else return dateFilter >= dateFrom && dateFilter <= dateTo;
      }
    });   

    this.generatedData = filterBy;  
  }

  // get index of array
  getIndex(item): number {
    return this.selectedColumns.indexOf(item); 
  }

  // find title of column
  getFindTitle(col_name: any): any {
    return this.displayedColumns.find((el) => el.col_name === col_name);
  }

  // sort array keys by displayed columns
  getSortedKeys(el): any {
    return Object.getOwnPropertyNames(el).sort((a,b) => this.selectedColumns.indexOf(a) - this.selectedColumns.indexOf(b));
  }

  /* Remove hidden columns from search */
  getModifyObject(el): any {
    const sorted = this.getSortedKeys(el);
    const result = {};

    sorted.forEach((item, _i) => {
      /*if(item === 'first_name') 
        result['full_name'] = `${el['first_name']} ${el['last_name']}`;*/
      
      if(this.getIndex(item) !== -1 && !item.match('date')) {
        result[this.getFindTitle(item)?.title] = el[item];
      }

      else if(item?.match('date')){
        if(el[item] && this.getFindTitle(item)?.title)
          result[this.getFindTitle(item)?.title] = format(new Date( typeof el[item] ==='string' ? (el[item]) : (el[item] * 1000)), 'EEEE, dd/MM/yyyy');
      }
    });

    return result;
  }

  generateReport(){
    /* OPTION FOR EXPORTING DATA */
    let data = [...this.data?.data_list].map((el) => this.getModifyObject(el));
    let columns = this.displayedColumns.filter(el => this.selectedColumns.indexOf(el.col_name) > -1).map(el => el.title);
    
    if(this.data?.groupBy && this.data?.groupItems){
      this.generatedData = data;
      this.generatedColumn = columns;
      this.grouping = [...new Set(data.map((el: any) => el[this.data?.groupBy]))];
      this.filteredGrouping = [...this.grouping];
    }

    else {
      this.generatedData = data;
      this.generatedColumn = columns;
      this.grouping = [...new Set(data.map((el: any) => el[this.data?.groupBy]))];
      this.filteredGrouping = [...this.grouping];
    }

    // if there's active filtering
    if(this.data?.activeDateFilter?.dateFrom || this.data?.activeDateFilter?.dateTo){
      const filterBy = data?.filter(el => {
        if(this.data?.activeDateFilter?.dateFrom || this.data?.activeDateFilter?.dateTo){
          let dateFilter = moment(el[this.data?.filterBy], "DD/MM/YYYY").toDate();
          let dateFrom = this.data?.activeDateFilter?.dateFrom !== this.data?.filterBy ? new Date(this.data?.activeDateFilter?.dateFrom) : undefined;   
          let dateTo = this.data?.activeDateFilter?.dateTo !== this.data?.filterBy ? new Date(this.data?.activeDateFilter?.dateTo) : undefined;   

          if(dateFrom && dateTo){
            return dateFilter >= dateFrom && dateFilter <= dateTo;
          }

          else if(dateFrom && dateTo !== this.data?.filterBy){
            return dateFilter >= dateFrom;
          }

          else if(dateFrom !== this.data?.filterBy && dateTo){
            return dateFilter <= dateTo;
          }

          else return dateFilter >= dateFrom && dateFilter <= dateTo;
        }
      });   

      this.generatedData = filterBy;
    }
  }

  checkGrouping(event){
    let generatedData = this.generatedData?.filter(el => el[this.data?.groupBy] === event);  

    return generatedData?.length > 0 ? true : false;
  }

  getCanvasElement(id: string){
    //let itemList = this.data?.groupItems ? [/*...this.filteredGrouping, */...this.generatedColumn] : this.generatedColumn;
    let itemList = [...this.generatedColumn].filter(a => a !== this.data?.groupBy);

    this.dialogRef.close();
    this.excelService.exportAsExcelHtml(id, `${this.data?.sub_title} Report - ` + format(new Date(), 'EEE, dd/MM/yyyy hh:mm'), itemList);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }


  filterGroup(data){
    let openFilterChecklist = this.dialog.open(
      SelectGroupGlobalComponent,
      { 
          minWidth: '300px',
          maxWidth: '420px',
          data: {
            groupBy: this.data?.groupBy,
            data: data
          },

        }
      );

      openFilterChecklist
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.filteredList?.length > 0){
          this.filteredGrouping = result?.filteredList;
          //this.loading = true;  
          //setTimeout(() => this.loading = false, 1000);
        }
      });
  }

}
