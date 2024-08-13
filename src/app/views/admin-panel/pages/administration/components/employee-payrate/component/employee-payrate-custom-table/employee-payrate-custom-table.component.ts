import { 
  OnInit, 
  OnDestroy, 
  Component, 
  ViewChild, 
  HostListener, 
  ElementRef, 
  Input, Renderer2, 
  ChangeDetectorRef,
  Output,
  EventEmitter,
  AfterViewInit
} from '@angular/core';

import { Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertComponent } from '@main/shared/components';
import { 
  debounceTime, 
  distinctUntilChanged, 
  pairwise, 
  takeUntil 
} from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { PriceListActionTypes } from '@main/views/admin-panel/store/actions/admin-price-list.action';

@Component({
  selector: 'app-employee-payrate-custom-table',
  animations: [mainAnimations],
  templateUrl: './employee-payrate-custom-table.component.html',
  styleUrls: ['./employee-payrate-custom-table.component.scss']
})
export class EmployeePayrateCustomTableComponent implements OnInit {

  private priceList$: any;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  @Input() loading: boolean = true;
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = [];
  @Input() withHeader: boolean = true;
  @Input() searchSource: any;
  @Input() withFolder: boolean = false;
  @Input() showStatData: boolean = true;
  @Input() isTTP: boolean = false;
  @Input() download_template: any[] = [];
  @Input() sample_data_template: any[] = [];

  @Input() displayedColumns: any[] = [];
  @Input() selectedColumns: string[] = [];
  @Input() selectedColumnsMobile: string[] = [];
  @Input() tableNumber: number = 0;
  @Input() multipleSelect: boolean = false;
  @Output() updateSelectedRows: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteSelectedRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSelectedRowDialog: EventEmitter<any> = new EventEmitter<any>();
  @Output() import: EventEmitter<any> = new EventEmitter<any>();
  
  @Output() viewDetails: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('inputs', {static: false}) inputs: ElementRef;
  @Input() maxRows: number = 5;

  public serviceLocation: string = sessionStorage.getItem('serviceLocation') || 'ACT';
  public serviceLocationList: string[] = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA", "Remote", "Very Remote"];
  
  // for filtering
  public searchBy: string = '';
  public dataSource: any = new MatTableDataSource<any[]>(this.listDataSource);
  public selectedRows: any[] = [];

  // pagination option 
  public page: number = 1;
  public pageNumbers: number = 1;
  public paginate: number[] = [];
  public dbClickActive: boolean = false;
  // column and table controls
  public tableController: any = [
    {
      name:'Import',
      class: 'import',
      icon: '/assets/images/icons/import.png',
      action_event: (action_event) => action_event
    },

    {
      name:'Delete',
      class: 'delete',
      icon: '/assets/images/icons/delete.png',
      action_event: (action_event) => action_event
    },
  ];

  /* EDITOR */
  public editor = { pointer: { col: -1, row: -1 } };
  public pressed: boolean;

  constructor(private router: Router,
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar,
    private adminPayrate: Store<AdminProfileState>,
    public dialog: MatDialog) { 

  }

  // KEYBOARD NAVIGATOR LISTENER
  @HostListener('window:keyup', ['$event'])
      keyEvent(event: KeyboardEvent) {
      if (this.pressed) {
      switch (event.key) {
        case 'ArrowLeft' :{ this.shiftFocusLeft(); break; }
        case 'ArrowRight':{ this.shiftFocusRight(); break; }
        case 'ArrowUp'   :{ this.shiftFocusUp(); break; }
        case 'ArrowDown' :{ this.shiftFocusDown(); break; }
        case 'Escape'    :{ this.removeListener(); break; }
      }
    }
  }

  // remove host listener
  removeListener(){
    this.pressed = false;
    this.editor = {
      pointer: {
        col: -1,
        row: -1
      }
    };
    this.inputs.nativeElement.blur();
  }

  /**
   * Switch input
   * @param rindex row index
   * @param cindex column index
  */
  switchToInput(rindex, cindex) {
     this.pressed = true;
     let column = this.displayedColumns;

     if(this.displayedColumns[cindex]?.editable){
       this.editor.pointer.col = cindex;
       this.editor.pointer.row = rindex;

       this.focusInput();
     }
  }

  shiftFocusDown() {
     // down one row, and correct for non editable columns to down
     const rIndex  = this.editor.pointer.row + 1;
     const cIndex  = this.editor.pointer.col;
     const nextRow = this.editor.pointer.row + 1;

     this.editor.pointer.row = rIndex;
     this.focusInput();
  }

  shiftFocusUp() {
     // up one row, and correct for non editable columns to up
     const rIndex = this.editor.pointer.row - 1;
     const cIndex  = this.editor.pointer.col;
     const nextRow = this.editor.pointer.row - 1;

     this.editor.pointer.row = rIndex;
    
     this.focusInput();
  }

  shiftFocusLeft() {
     // left one column, and correct for non editable columns to left
     const cIndex = this.editor.pointer.col - 1;
     
     if(this.displayedColumns[cIndex]?.editable){
       this.editor.pointer.col = cIndex;
       this.focusInput();
     }
  }

  shiftFocusRight() {
     // right one column, and correct for non editable columns to right
     const cIndex = this.editor.pointer.col + 1;
     
     this.editor.pointer.col = cIndex;
     this.focusInput();
  }

  getOldValue(value){
    sessionStorage.removeItem('oldColumnValue');
    sessionStorage.setItem('oldColumnValue', JSON.stringify(value));
  }

  /**
   * Focus input
   */
  focusInput() {
     setTimeout(() => {
       if(this.inputs){
         this.inputs.nativeElement.focus();
         //this.inputs.nativeElement.selectionStart = 0;
       }
     }, 100);
  }

  ngOnInit(): void {
    this.dataSource.data = [...this.listDataSource].slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...this.listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
  
    /* SUBSCRIBE TO PRICELIST */
    this.priceList$ = this.adminPayrate.pipe(select(state => state.priceList));
    this.req =  this.priceList$.subscribe((priceList: any) => {
      if(priceList.successInline){

      }

      if(priceList.error){
        this.snackBar.open("Something went wrong please try again later or contact your administrator", "", {
          duration: 4000,
          panelClass:'danger-snackbar'
        });
      }
    })
  }

  /* UPDATE TABLE */
  save(data){
    let objReq = {
      id: data?.id,
      standard_rate: data?.standard_rate,
      afternoon_rate: data?.afternoon_rate,
      evening_rate: data?.evening_rate,
      night_rate: data?.night_rate,
      saturday_rate: data?.saturday_rate,
      sunday_rate: data?.sunday_rate,
      public_holiday_rate: data?.public_holiday_rate,
      standard_rate_ttp: data?.standard_rate_ttp,
      afternoon_rate_ttp: data?.afternoon_rate_ttp,
      evening_rate_ttp: data?.evening_rate_ttp,
      night_rate_ttp: data?.night_rate_ttp,
      saturday_rate_ttp: data?.saturday_rate_ttp,
      sunday_rate_ttp: data?.sunday_rate_ttp,
      public_holiday_rate_ttp: data?.public_holiday_rate_ttp,
    }

    this.snackBar.open("Update employee payrate is in progress. Please wait...", "", {
      duration: 4000,
      panelClass:'success-snackbar'
    });

    /*this.adminPayrate.dispatch({
      type: PriceListActionTypes.EDIT_PRICE_LIST_INLINE,
      payload: objReq
    }); */
  }

  getPriceList(value?: any){
    this.adminPayrate.dispatch({
      type: PriceListActionTypes.GET_PRICE_LIST_LIST,
      payload: value
    }); 

    if(value){
      sessionStorage.setItem('serviceLocation', value);
    }

  }

  ngOnDestroy(): void {
    sessionStorage.removeItem('oldColumnValue');
    if(this.inputs) this.inputs.nativeElement.blur();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  repaginate(list: any[]): void{
    this.pageNumbers = Math.ceil(list.length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
    this.page = 1;
  }

  
  /*
    Adjust max number of items shown for client list
      @params
        - limit: number (max number of items per page)
  */
  adjustNumberOfItems(limit: number = 10): void {
    const listDataSource = [...this.listDataSource];

    this.dataSource.data = listDataSource.slice(0, limit);
    this.maxRows = limit;
    this.repaginate(listDataSource);
  }

  /*
    Navigate to n page
      @params
        - page: page number to navigate
  */
  changePage(page: number): void {
    if(page < 1){
      this.page = 1;
      return;
    }

    if(page > this.paginate.length){
      this.page = this.paginate.length;
      return;
    }

    const temp = page * this.maxRows;
    const listDataSource = [...this.listDataSource].filter(el => {
      let source = this.searchSource(el);
      /* Remove hidden columns from search */
      for(let item in source){
        let index = this.selectedColumns.indexOf(item) 

        if(index === -1)
          delete source[item];
      }
      
      return JSON.stringify(source).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.dataSource.data = listDataSource.slice(temp - this.maxRows, temp);
    this.page = page;
  }

  pageRange(page, pageCount) {
    let start = page - 2,
        end = page + 2;

    if (end > pageCount) {
        start -= (end - pageCount);
        end = pageCount;
    }
    if (start <= 0) {
        end += ((start - 1) * (-1));
        start = 1;
    }

    end = end > pageCount ? pageCount : end;

    return {
        start: start - 1,
        end: end
    };
  }


  /*
    Client list table filter
  */
  searchDataSource(): void {
    const listDataSource = [...this.listDataSource]
    .filter(el => {
      let source = this.searchSource(el);
      /* Remove hidden columns from search */
      for(let item in source){
        let index = this.selectedColumns.indexOf(item) 

        if(index === -1)
          delete source[item];
      }
      
      return JSON.stringify(source).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.dataSource.data = listDataSource.slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);;
    this.page = 1;

  }

  /* 
    Select row from list 
    @params 
      - row : Client List row
  */
  selectRows(row: any){
    let index = this.selectedRows.findIndex(el => el.id === row.id);

    if(index > -1)
        this.selectedRows.splice(index, 1);
    else {
      if(this.multipleSelect)
        this.selectedRows = [...this.selectedRows, row];     
      
      else 
        this.selectedRows = [row];
    }

    // update selected rows from parent
    this.updateSelectedRows.emit({
      tableNumber: this.tableNumber,
      selectedRows: this.selectedRows
    }); 
  }


  /*
    Open dialog component 
      @params 
        - action_type : What kind of dialog should open
  */
  openDialog(action_type: string, data?: any): void {

    if(action_type === 'edit') {
      this.updateSelectedRowDialog.emit({
        action: action_type,
        data: data
      });
    }
      
    else if(action_type === 'delete'){
      this.deleteSelectedRow.emit({
        action: action_type,
        data: data
      });
    }

    else if(action_type === 'import'){
      this.import.emit()
    }
      
  }

  /* View Detail Dialog
  */
  viewDetailDialog(row): void{
    console.log(row)
    this.viewDetails.emit({
      title: this.componentTitle,  
      data: row
    });
  }

  exportAsXLSX(type?):void { 
    /* Find index  */
    const index = (item) => this.selectedColumns.indexOf(item); 
    /* Find title from columns */
    const findTitle = (col_name: any) => this.displayedColumns.find((el) => el.col_name === col_name)["col_name"];
    
    /* Find index  */
    const indexTemplate = (item) => this.download_template.map(el => el.col_name).indexOf(item); 
    /* Find title from columns */
    const findTitleTemplate = (col_name: any) => this.download_template.find((el) => el.col_name === col_name)["col_name"];
    
    /* Sort columns by keys */
    const sortedKeys = (el) => Object.getOwnPropertyNames(el).sort((a,b) => this.selectedColumns.indexOf(a) - this.selectedColumns.indexOf(b));
    
    /* Remove hidden columns from search */
    const modifyObject = (el: any) => {
      const sorted = sortedKeys(el);
      const result = {};

      sorted.forEach((item, _i) => {
        if(index(item) !== -1) {
          result[findTitle(item)] = el[item];
        }
      });

      return result;
    }

    /* Remove hidden columns from search */
    const modifyObjectTemplate = (el: any) => {
      const sorted = sortedKeys(el);
      const result = {};

      sorted.forEach((item, _i) => {
        if(indexTemplate(item) !== -1) {
          result[findTitleTemplate(item)] = el[item];
        }
      });

      return result;
    }

    /* OPTION FOR EXPORTING DATA */
    let data;

    switch (true){
      case (type === 'template'): {
        data =  [...this.sample_data_template].map((el) => modifyObjectTemplate(el));
        break;
      }

      case (type === 'all'): {
        data = [...this.listDataSource].map((el) => modifyObject(el));
        break;
      }

      case (type === 'selected'): {
        data = [...this.selectedRows].map((el) => modifyObject(el));
        break;
      }

      default: {
        data = [...this.dataSource.data].map((el) => modifyObject(el));
        break;
      }
    }

    this.excelService.exportAsExcelFile(data, this.componentTitle);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }

  getMaxRate(property: string, data: any, row): void{
    const conditionTrigger = (key: string, title: string) => {
      let maxVal = `${key}_max`;
      let initialRate = JSON.parse(sessionStorage.getItem('oldColumnValue'))[maxVal];

      if(data[key] > data[maxVal] && data[maxVal] > 1){
        this.openAlertDialog(data[maxVal], data[key], row, property, title)
      }

      else {
        this.save(this.dataSource.data[row]); // save
        console.log("SAVE OBJECT")
      }
    }

    if(!this.isTTP){
      /* STANDARD */
      if(property === 'standard_rate')
        conditionTrigger('standard_rate', 'Standard Rate');
      
      /* SATURDAY */
      else if(property === 'saturday_rate')
        conditionTrigger('saturday_rate', 'Saturday Rate');
      

      /* SUNDAY */
      else if(property === 'sunday_rate')
        conditionTrigger('sunday_rate', 'Sunday Rate');

      /* NIGHT */
      else if(property === 'night_rate')
        conditionTrigger('night_rate', 'Night Rate');

      /* NIGHT */
      else if(property === 'evening_rate')
        conditionTrigger('evening_rate', 'Evening Rate');

      /* AFTERNOON */
      else if(property === 'afternoon_rate')
        conditionTrigger('afternoon_rate', 'Afternoon Rate');

      /* PUBLIC HOLIDAY */
      else if(property === 'public_holiday_rate')
        conditionTrigger('public_holiday_rate', 'Public Holiday Rate');
    }

    else if(this.isTTP){
      /* STANDARD */
      if(property === 'standard_rate_ttp')
        conditionTrigger('standard_rate_ttp', 'Standard Rate TTP');
      
      /* SATURDAY */
      else if(property === 'saturday_rate_ttp')
        conditionTrigger('saturday_rate_ttp', 'Saturday Rate TTP');
      

      /* SUNDAY */
      else if(property === 'sunday_rate_ttp')
        conditionTrigger('sunday_rate_ttp', 'Sunday Rate TTP');

      /* NIGHT */
      else if(property === 'night_rate_ttp')
        conditionTrigger('night_rate_ttp', 'Night Rate TTP');

      /* NIGHT */
      else if(property === 'evening_rate_ttp')
        conditionTrigger('evening_rate_ttp', 'Evening Rate TTP');

      /* AFTERNOON */
      else if(property === 'afternoon_rate_ttp')
        conditionTrigger('afternoon_rate_ttp', 'Afternoon Rate TTP');

      /* PUBLIC HOLIDAY */
      else if(property === 'public_holiday_rate_ttp')
        conditionTrigger('public_holiday_rate_ttp', 'Public Holiday Rate TTP');
    }
  }

  openAlertDialog(maxValue: number, newValue: number, row: number, property: any, title: string){
    let alertDialog = this.dialog.open(
      AlertComponent,
      { 
        maxWidth: '38vw',
        data: {
          title: 'Maximum Rate Exceeded!',
          details: `The rate of $${newValue} exceed the maximum "${title}" value of $${maxValue}.<br><br> By clicking continue it will override the maximum rate for "Self Funded" clients. `
        },
      }
    );

    alertDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(!result){
        this.dataSource.data[row][property] = maxValue;
        this.save(this.dataSource.data[row]); // save
      }

      else this.save(this.dataSource.data[row]);
    });

  }


}
