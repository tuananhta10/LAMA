import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnDestroy
} from '@angular/core';
import { Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

import { CustomDateAdapter } from '@app-shared/directives/datepicker-directive';
import { forwardRef, Host, Optional, SkipSelf } from '@angular/core';
import { AbstractControl, ControlContainer, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'client-reusable-list-view',
  animations: [mainAnimations],
  templateUrl: './reusable-list-view.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReusableListViewComponent),
      multi: true
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
    DatePipe
  ],
  styleUrls: ['./reusable-list-view.component.scss']
})
export class ReusableListViewComponent implements OnInit, OnDestroy {
  @Input() loading: boolean = true;
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = [];
  @Input() withHeader: boolean = true;
  @Input() searchSource: any;
  @Input() withFolder: boolean = false;
  @Input() showStatData: boolean = true;
  @Input() exportable: boolean = true;
  @Input() dateWithDay: boolean = false;
  @Input() displayedColumns: any[] = [];
  @Input() selectedColumns: string[] = [];
  @Input() selectionReference:string = ''
  @Input() download_template: any[] = [];
  @Input() sample_data_template: any[] = [];

  @Input() selectedColumnsMobile: string[] = [];
  @Input() tableNumber: number = 0;
  @Input() multipleSelect: boolean = false;
  @Input() showImageEmpty: boolean = true;
  @Input() selectAll: boolean = false;
  @Output() updateSelectedRows: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteSelectedRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSelectedRowDialog: EventEmitter<any> = new EventEmitter<any>();
  @Output() viewDetails: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @Input() maxRows: number = 25;
  @Input() withImport: boolean = false;
  @Input() withReport: boolean = false;
  @Input() withRemittance: boolean = false;
  @Input() withPublish: boolean = false;

  @Input() mockExportData: any = {};
  @Output() import: EventEmitter<any> = new EventEmitter<any>();
  @Output() report: EventEmitter<any> = new EventEmitter<any>();
  @Output() remittance: EventEmitter<any> = new EventEmitter<any>();
  @Output() publishFunding: EventEmitter<any> = new EventEmitter<any>();


  @ViewChild('dateFrom') dateFrom;
  @ViewChild('dateTo') dateTo;

  // for filtering dates
  @Input() showDateFilter: boolean = false;
  @Input() dateSource: any = 'date_created';
  @Input() isDelete: boolean = true;
  @Input() fromClaim:boolean = false;

  public searchBy: string = '';
  public dateSearch: any = {
    dateFrom: '',  
    dateEnd: ''
  }
  
  public dataSource = new MatTableDataSource<any>(this.listDataSource);
  public selectedRows: any[] = [];

  // pagination option
  public page: number = 1;
  public pageNumbers: number = 1;
  public paginate: number[] = [];
  public dbClickActive: boolean = false;
  // column and table controls
  public tableController: any = [
    // {
    //   name:'Import',
    //   class: 'import',
    //   icon: '/assets/images/icons/import.png',
    //   action_event: (action_event) => action_event
    // },
    
    {
      name:'Delete',
      class: 'delete',
      icon: '/assets/images/icons/delete.png',
      action_event: (action_event) => action_event
    },
  /*
      {
        name:'Export',
        class: 'export',
        icon: '/assets/images/icons/export.png',
        action_event: (action_event) => action_event
      },*/
  ];
  public displayedCols:any[] = []

  public selectedCols:any[] = []

  constructor(private router: Router,
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private datePipe:DatePipe) {

  }

  ngOnInit(): void {
    //this.listDataSource = [];
    //this.filterByStatus(); // filter client list by status
    let unincluded = [
      'invoice_batch_registration_number',
      'funding_source_registration_number'
    ]
    this.displayedCols = [...this.displayedColumns].filter(res => res.col_name !== 'invoice_batch_registration_number' || res.col_name !== 'invoice_batch_registration_number')
    this.selectedCols = [...this.selectedColumns].filter(res => !unincluded.includes(res))

    let listDataSource = [...this.listDataSource]
    // if(this.dateWithDay){
    //   listDataSource = []
    //   listDataSource = [...this.listDataSource].map(res => ({
    //     ...res,
    //     calendar_schedule: this.parseDateString(res.calendar_schedule)
    //   }))
    // }
    this.dataSource.data = listDataSource.slice(0, this.maxRows);
    
    this.pageNumbers = Math.ceil([...this.listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
    
    if(this.withImport){
      this.tableController.unshift(
        {
          name:'Import',
          class: 'import',
          icon: '/assets/images/icons/import.png',
          action_event: (action_event) => action_event
        }
      )
    }

    if(this.withReport){
      this.tableController.unshift(
        {
          name:'Report',
          class: 'report',
          icon: '/assets/images/icons/report.png',
          action_event: (action_event) => action_event
        },
      )
    }

    if(this.withRemittance){
      this.tableController.unshift(
        {
          name:'Upload Remittance',
          class: 'remittance',
          icon: '/assets/images/icons/import.png',
          action_event: (action_event) => action_event
        },
      )
    }
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  repaginate(list: any[]): void{
    this.pageNumbers = Math.ceil(list.length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
    this.page = 1;
  }
  parseDateString(dateString: string): Date {
    const [day, month, year] = dateString.split('-').map(Number);
    return new Date(year, month - 1, day); // month is 0-indexed in JavaScript Date object
  }
  checkIsNan(num): boolean {
    console.log(isNaN(num))

    if(isNaN(num))
      return true;  

    return false;
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

  ngOnDestroy(): void {
    this.dataSource.data = []
    this.listDataSource = []
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
    const listDataSource = [...this.listDataSource];

    this.dataSource.data = listDataSource.slice(temp - this.maxRows, temp);
    this.page = page;
    //window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
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


  updateDateFilter(){
    const listDataSource = [...this.listDataSource].filter(el => {
        let dateFrom = new Date(this.dateSearch?.dateFrom);
        dateFrom.setHours(0); // Set hours to 0 (midnight)
        dateFrom.setMinutes(0); // Set minutes to 0
        dateFrom.setSeconds(0); // Set seconds to 0

        let dateTo = new Date(this.dateSearch?.dateTo);
        dateTo.setHours(23); // Set hours to 23 (11 PM)
        dateTo.setMinutes(59); // Set minutes to 59
        dateTo.setSeconds(0); // Set seconds to 0

        let elDate = new Date(el[this.dateSource] * 1000)
        let dateFromCondition = elDate >= dateFrom;
        let dateToCondition = elDate <= dateTo;

        return this.dateSearch?.dateTo ? (dateFromCondition && dateToCondition) : dateFromCondition;
      } 
    );

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
    let index = this.selectedRows.findIndex((el) =>
      this.fromClaim
        ? el?.client_service_schedule_id === row?.client_service_schedule_id
        : el[this.selectionReference ? this.selectionReference : 'id'] === row[this.selectionReference ? this.selectionReference : 'id']
    );

    if(index > -1){
      this.selectedRows.splice(index, 1);

      if(this.withPublish){
        let publishIndex = this.tableController.findIndex(el => el?.class === 'publish-funding');
        this.tableController.splice(publishIndex, 1);
      }
    }
        
    else {
      if(this.multipleSelect)
        this.selectedRows = [...this.selectedRows, row];

      else{
        this.selectedRows = [row];
        this.forPublishing(row);
      }
    }

    // update selected rows from parent
    this.updateSelectedRows.emit({
      tableNumber: this.tableNumber,
      selectedRows: this.selectedRows
    });
  }

  forPublishing(row){
    if(this.withPublish){
      let index = this.tableController.findIndex(el => el?.class === 'publish-funding');

      let objVal = {
        name:'Publish Funding',
        class: 'publish-funding',
        icon: '/assets/images/icons/publish.png',
        action_event: (action_event) => action_event
      }

      if(row?.status?.toLowerCase() === 'published'){
        objVal['name'] = "Unpublish Funding"
      }

      if(index){
        this.tableController.unshift(objVal);
      }

      else this.tableController[index]['name'] = objVal['name'];
    }
  }


  selectAllRows(){
    if(this.selectedRows?.length === 0){
      this.selectedRows = [...this.dataSource?.data];
    } 

    else this.selectedRows = [];

    //this.selectedRow
    this.updateSelectedRows.emit({
      tableNumber: this.tableNumber,
      selectedRows: this.selectedRows
    });
  }

  unselectAllRows(){
    this.selectedRows = [];

  }

  /*
    Open dialog component
      @params
        - action_type : What kind of dialog should open
  */
  openDialog(action_type: string, data: any): void {
    //console.log(action_type, data)

    if(action_type === 'edit') {
      this.updateSelectedRowDialog.emit({
        action: action_type,
        data: data
      });
    }

    else if(action_type === 'delete'){
            this.deleteSelectedRow.emit({
        action: action_type,
        data: data ? data : this.selectedRows
      });
    }

    else if(action_type === 'import'){
      this.import.emit('');
    }

    else if(action_type === 'report'){
      this.report.emit('Generate Report');
    }  

    else if(action_type === 'remittance'){
      this.remittance.emit('');
    }

    else if(action_type === 'publish-funding'){
      this.publishFunding.emit({
        action: action_type,
        data: this.selectedRows[0]
      });
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

    /* OPTION FOR EXPORTING DATA */
    let data;

    switch (true){
      case (type === 'template'): {
        if(this.download_template?.length > 0){
          /* Find index  */
          const indexTemplate = (item) => this.download_template.map(el => el.col_name).indexOf(item); 
          /* Find title from columns */
          const findTitleTemplate = (col_name: any) => this.download_template.find((el) => el.col_name === col_name)["col_name"];
          
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

          if(this.sample_data_template){
            data = [...this.sample_data_template].map((el) => modifyObjectTemplate(el));
          }

          else {
            data = [...this.download_template].map((el) => modifyObjectTemplate(el));
          }
        }

        else {
          data = [[...this.displayedColumns.map(el => el.col_name)]
            .filter(el => el !== 'action')
            .reduce((ac,a) => ({...ac,[a]:''}),{})
          ];
        }
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

  public isTimeStamp(data){
    if(typeof data === 'number'){
      return data * 1000
    }else{
      return data
    }
  }

}
