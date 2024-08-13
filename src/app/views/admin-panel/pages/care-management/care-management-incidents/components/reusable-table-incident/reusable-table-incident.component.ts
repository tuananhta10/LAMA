import { 
  Component, 
  OnInit, 
  Input, 
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit
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

@Component({
  selector: 'care-reusable-table-incident',
  animations: [mainAnimations],
  templateUrl: './reusable-table-incident.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReusableTableIncidentComponent),
      multi: true
    },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  styleUrls: ['./reusable-table-incident.component.scss']
})
export class ReusableTableIncidentComponent implements OnInit {
@Input() loading: boolean = true;
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = [];
  @Input() withHeader: boolean = true;
  @Input() searchSource: any;
  @Input() withFolder: boolean = false;
  @Input() showStatData: boolean = true;

  @Input() displayedColumns: any[] = [];
  @Input() selectedColumns: string[] = [];
  @Input() selectedColumnsMobile: string[] = [];
  @Input() tableNumber: number = 0;
  @Input() multipleSelect: boolean = false;
  @Output() updateSelectedRows: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteSelectedRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSelectedRowDialog: EventEmitter<any> = new EventEmitter<any>();
  @Output() import: EventEmitter<any> = new EventEmitter<any>();
  @Output() report: EventEmitter<any> = new EventEmitter<any>();
  
  @Output() viewDetails: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @Input() maxRows: number = 25;

  // for filtering
  public searchBy: string = '';
  public dataSource = new MatTableDataSource<any>(this.listDataSource);
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
      name:'Report',
      class: 'report',
      icon: '/assets/images/icons/report.png',
      action_event: (action_event) => action_event
    },

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
  
  constructor(private router: Router,
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { 

  }

  /* DATE FILTER */
  @ViewChild('dateFrom') dateFrom;
  @ViewChild('dateTo') dateTo;

  // for filtering dates
  @Input() showDateFilter: boolean = false;
  @Input() dateSource: any = 'date_created';

  public dateSearch: any = {
    dateFrom: '',  
    dateEnd: ''
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
  
  ngOnInit(): void {
    //this.listDataSource = [];
    //this.filterByStatus(); // filter client list by status
    this.dataSource.data = [...this.listDataSource].slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...this.listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
  }

  clearFilters() {
    this.searchBy=""
    this.dateSearch.dateFrom=""
    this.dateSearch.dateTo=""
  
    this.dataSource.data = [...this.listDataSource].slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...this.listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
    this.page = 1;
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
  openDialog(action_type: string, data: any): void {
    console.log(action_type)

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
      this.import.emit('');
    }
      

   else if(action_type === 'report'){
     this.report.emit('Generate Report');
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

  capitalizeString(inputString): string {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1);
  }

  exportAsXLSX(type?):void { 
    /* Find index  */
    const index = (item) => this.selectedColumns.indexOf(item); 
    /* Find title from columns */
    const findTitle = (col_name: any) => this.displayedColumns.find((el) => el.col_name === col_name);
    /* Sort columns by keys */
    const sortedKeys = (el) => Object.getOwnPropertyNames(el)//.sort((a,b) => this.selectedColumns.indexOf(a) - this.selectedColumns.indexOf(b));
    
    console.log("Export")

    /* Remove hidden columns from search */
    const modifyObject = (el: any) => {
      const sorted = sortedKeys(el);
      const result = {};

      sorted.forEach((item, _i) => {
        if(item === 'first_name') 
          result['full_name'] = `${el['first_name']} ${el['last_name']}`;
        
        else if(/*index(item) !== -1 && */item !== 'first_name' && !item.match('date')) {
          console.log(el[item], item, result[findTitle(item)?.col_name])

          result[this.capitalizeString(item?.split('_')?.join(' '))] = typeof el[item] !== 'boolean' 
          && typeof el[item] !== 'object' ? el[item]
          : typeof el[item] === 'object' ? el[item]?.length
          : typeof el[item] === 'boolean' && el[item] === true  ? "Yes" 
          : typeof el[item] === 'boolean' && el[item] === false ? "No"
          : el[item]
        }

        else if(item?.match('date')){
          if(el[item] && findTitle(item)?.title)
            result[this.capitalizeString(item?.split('_')?.join(' '))] = new Date(el[item] * 1000).toLocaleDateString();
        }
      });

      return result;
    }

    /* OPTION FOR EXPORTING DATA */
    let data;

    switch (true){
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

    // sample form for import
    if(data?.length === 0){
      /*let sampleExportedData = this.displayedColumns
      .map(el => el.col_name)
      .reduce((acc, cur, i) => {
        acc[cur] = cur;
        return acc;
      }, {});

      delete sampleExportedData['action'];
      */

      data = [
        {
          "action_date": 1657005025,
          "allow_client_access": false,
          "allow_staff_access": true,
          "assigned_to": null,
          "assigned_to_id": null,
          "client_id": 481,
          "client_name": "Mindy Cruz",
          "date_added": 1656947585,
          "date_deleted": null,
          "date_received": 1656921600,
          "date_signed": 1657005025,
          "date_updated": 1656948353,
          "description": "This is a test incident",
          "employee_id": 231,
          "employee_name": "miaka horikawa",
          "event_after": "",
          "event_before": "",
          "event_during": "",
          "examined_by_doctor": false,
          "further_action_required": false,
          "hospitalised": false,
          "id": 7,
          "location": "",
          "notified_guardian": true,
          "notified_insurance": true,
          "notified_management": true,
          "notified_police": true,
          "notified_staff": true,
          "organization_id": 4,
          "phone": "5333333",
          "reported_by": "Admin Tester",
          "service_provider": "test coordinator",
          "severity": "Minor",
          "status": "Open",
          "time_of_incident": "15:00:00",
          "type": "Incident",
          "witnesses": ""
        }
      ]
    }

    this.excelService.exportAsExcelFile(data, this.componentTitle);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }

}

