import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  AfterViewInit,
  OnChanges,
  SimpleChanges
} from '@angular/core';
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

@Component({
  selector: 'app-employee-timesheet-approval-table',
  animations: [mainAnimations],
  templateUrl: './employee-timesheet-approval-table.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmployeeTimeSheetApprovalComponent),
      multi: true,
    },
    { provide: DateAdapter, useClass: CustomDateAdapter },
  ],
  styleUrls: ['./employee-timesheet-approval-table.component.scss'],
})
export class EmployeeTimeSheetApprovalComponent implements OnInit, OnChanges {
  @Input() loading: boolean = true;
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = [];
  @Input() withHeader: boolean = true;
  @Input() searchSource: any;
  @Input() withFolder: boolean = false;
  @Input() showStatData: boolean = true;
  @Input() showImport: boolean = false;
  @Input() showTableControls: boolean = true;
  @Input() showApproval: boolean = false;
  @Input() recordCount:number;

  @Input() displayedColumns: any[] = [];
  @Input() selectedColumns: string[] = [];
  @Input() selectedColumnsMobile: string[] = [];
  @Input() tableNumber: number = 0;
  @Input() multipleSelect: boolean = false;
  @Input() tableState: any;
  @Output() updateSelectedRows: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteSelectedRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSelectedRowDialog: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() import: EventEmitter<any> = new EventEmitter<any>();
  @Output() report: EventEmitter<any> = new EventEmitter<any>();
  @Output() approveDeclineTimesheet: EventEmitter<any> =
    new EventEmitter<any>();
  @Output() viewDetails: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @Input() maxRows: number;

  // for filtering
  public searchBy: string = '';
  public dataSource = new MatTableDataSource<any>(this.listDataSource);
  public selectedRows: any[] = [];

  public filteredListDataSourceByDate: any[] = [];
  public filteredListDataSourceBySearch: any[] = [];

  // pagination option
  public page: number;
  public pageNumbers: number = 1;
  public paginate: number[] = [];
  public dbClickActive: boolean = false;
  // column and table controls
  public tableController: any = [
    {
      name: 'Import',
      class: 'import',
      icon: '/assets/images/icons/import.png',
      action_event: (action_event) => action_event,
    },
    {
      name: 'Report',
      class: 'report',
      icon: '/assets/images/icons/report.png',
      action_event: (action_event) => action_event,
    },

    /*{
      name:'Delete',
      class: 'delete',
      icon: '/assets/images/icons/delete.png',
      action_event: (action_event) => action_event
    },*/
    /*
      {
        name:'Export',
        class: 'export',
        icon: '/assets/images/icons/export.png',
        action_event: (action_event) => action_event
      },*/
  ];
  public showActualTime: boolean = false;
  constructor(
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) {}

  /* DATE FILTER */
  @ViewChild('dateFrom') dateFrom;
  @ViewChild('dateTo') dateTo;

  // for filtering dates
  @Input() showDateFilter: boolean = false;
  @Input() dateSource: any = 'date_created';

  public dateSearch: any = {
    dateFrom: '',
    dateEnd: '',
  };

  @Output() setReportDate: EventEmitter<any> = new EventEmitter<any>();
  @Output() dateFilterAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() changePageAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() statusFilterAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() pageNumberAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearFilterAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() searchAction: EventEmitter<any> = new EventEmitter<any>();

  updateDateFilter() {
    setTimeout(() => {
      this.dateFilterAction.emit(this.dateSearch)
    }, 700);
  }

  ngOnInit(): void {
    
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setTableState()
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  setTableState(){
    const page = this.tableState?.page
    const maxRows = this.tableState?.maxRows
    const dateFrom = this.tableState?.dateFrom
    const dateTo = this.tableState?.dateTo
    const approvalStatus = this.tableState?.status
    this.page = page ? +page : 1
    this.maxRows = maxRows ? +maxRows : 25
    this.dateSearch.dateFrom = dateFrom ? dateFrom: undefined 
    this.dateSearch.dateTo = dateFrom ? dateTo :undefined 
    this.approvalStatus = approvalStatus ? approvalStatus : 'Show All Status'

    this.dataSource.data = [...this.listDataSource].slice(0, this.listDataSource.length);
    this.pageNumbers = Math.ceil(
      this.recordCount / this.maxRows
    );
    this.paginate = Array(this.pageNumbers)
      .fill(0)
      .map((el, i) => i + 1);
  }
  
  repaginate(list: any[]): void {
    this.pageNumbers = Math.ceil(list.length / this.maxRows);
    this.paginate = Array(this.pageNumbers)
      .fill(0)
      .map((el, i) => i + 1);
    this.page = 1;
  }

  /*
    Adjust max number of items shown for client list
      @params
        - limit: number (max number of items per page)
  */
  adjustNumberOfItems(limit: number = 10): void {
    this.pageNumberAction.emit(limit)
  }

  /*
    Navigate to n page
      @params
        - page: page number to navigate
  */
  changePage(page: number): void {
    this.changePageAction.emit({page: page, paginate: this.paginate})
  }

  changePageWithFilter(page?, listDataSource?, temp?) {
    const _listDataSource = [...listDataSource].filter((el) => {
      let dateFrom = new Date(this.dateSearch?.dateFrom);
      dateFrom.setHours(0); // Set hours to 0 (midnight)
      dateFrom.setMinutes(0); // Set minutes to 0
      dateFrom.setSeconds(0); // Set seconds to 0

      let dateTo = new Date(this.dateSearch?.dateTo);
      dateTo.setHours(23); // Set hours to 23 (11 PM)
      dateTo.setMinutes(59); // Set minutes to 59
      dateTo.setSeconds(0); // Set seconds to 0

      let elDate = AdminHelper.dateGmt(el[this.dateSource]);
      let dateFromCondition = elDate >= dateFrom;
      let dateToCondition = elDate <= dateTo;

      this.setReportDate.emit({
        dateFrom: this.dateSearch?.dateFrom ? dateFrom : null,
        dateTo: this.dateSearch?.dateTo ? dateTo : null,
      });

      return this.dateSearch?.dateTo
        ? dateFromCondition && dateToCondition
        : dateFromCondition;
    });

    this.dataSource.data = _listDataSource.slice(temp - this.maxRows, temp);
    this.page = page;
  }

  pageRange(page, pageCount) {
    let start = page - 2,
      end = page + 2;

    if (end > pageCount) {
      start -= end - pageCount;
      end = pageCount;
    }
    if (start <= 0) {
      end += (start - 1) * -1;
      start = 1;
    }

    end = end > pageCount ? pageCount : end;

    return {
      start: start - 1,
      end: end,
    };
  }

  public approvalStatus: any = 'Show All Status';

  searchByStatus(status: string) {
    this.statusFilterAction.emit(status)
  }

  clearFilters() {
    this.dateSearch.dateFrom = '';
    this.dateSearch.dateTo = '';
    this.searchBy = '';
    
    this.clearFilterAction.emit(true)
  }
  /*
    Client list table filter
  */
  searchDataSource(): void {

    //
    setTimeout(() => {
      this.searchAction.emit(this.searchBy)
    }, 2000);
    // if(this.searchBy === ''){
    //   if(this.dateSearch?.dateFrom || this.dateSearch?.dateTo){
    //     this.updateDateFilter()
    //     return
    //   }
    // }

    // const originalDataSource = this.dateSearch?.dateFrom || this.dateSearch?.dateTo ? this.filteredListDataSourceByDate : this.listDataSource
    
    // const listDataSource = [...originalDataSource].filter((el) => {
    //   let source = this.searchSource(el);

    //   if (this.searchBy?.toLowerCase() === 'approved') {
    //     return el?.employee_timesheet_approved === true;
    //   } else if (
    //     this.searchBy?.toLowerCase() === 'for approval' ||
    //     this.searchBy?.toLowerCase() === 'not approved'
    //   ) {
    //     return !el?.employee_timesheet_approved;
    //   } else if (this.searchBy?.toLowerCase() === 'paid') {
    //     return el?.employee_timesheet_paid === true;
    //   } else {
    //     /* Remove hidden columns from search */
    //     for (let item in source) {
    //       let index = this.selectedColumns.indexOf(item);

    //       if (index === -1) delete source[item];
    //     }
    //   }

    //   return JSON.stringify(source)
    //     .toLowerCase()
    //     .includes(this.searchBy.toLowerCase());
    // });
    // this.filteredListDataSourceBySearch = listDataSource.slice(0, this.maxRows);
    // this.dataSource.data = listDataSource.slice(0, this.maxRows);
  
  }

  /*
    Select row from list
    @params
      - row : Client List row
  */
  selectRows(row: any) {
    let index = this.selectedRows.findIndex(
      (el) => el.employee_timesheet_id === row.employee_timesheet_id
    );

    if (index > -1) this.selectedRows.splice(index, 1);
    else {
      if (this.multipleSelect) this.selectedRows = [...this.selectedRows, row];
      else this.selectedRows = [row];
    }

    // update selected rows from parent
    this.updateSelectedRows.emit({
      tableNumber: this.tableNumber,
      selectedRows: this.selectedRows,
    });
  }

  public selectAllRows():void {
    
    const listArray = [...this.dataSource.data]
    const getUniques = new Set([...this.selectedRows, ...listArray])
    this.selectedRows = [...getUniques]
  }

  public unselectAllRows():void{
    this.selectedRows = []
  }

  /*
    Open dialog component
      @params
        - action_type : What kind of dialog should open
  */
  openDialog(action_type: string, data: any, approved?: any): void {
    if (action_type === 'edit') {
      this.updateSelectedRowDialog.emit({
        action: action_type,
        data: data,
      });
    } else if (action_type === 'delete') {
      this.deleteSelectedRow.emit({
        action: action_type,
        data: data,
      });
    } else if (action_type === 'import') {
      this.import.emit();
    } else if (action_type === 'report') {
      this.report.emit('Generate Report');
    } else if (action_type === 'approve_decline') {
      this.approveDeclineTimesheet.emit({
        data: data,
        approved_decline: approved,
      });
    }
  }

  /* View Detail Dialog
   */
  viewDetailDialog(row): void {
    console.log(row);
    this.viewDetails.emit({
      title: this.componentTitle,
      data: row,
    });
  }

  exportAsXLSX(type?): void {
    /* Find index  */
    const index = (item) => this.selectedColumns.indexOf(item);
    /* Find title from columns */
    const findTitle = (col_name: any) =>
      this.displayedColumns.find((el) => el.col_name === col_name)['col_name'];
    /* Sort columns by keys */
    const sortedKeys = (el) =>
      Object.getOwnPropertyNames(el).sort(
        (a, b) =>
          this.selectedColumns.indexOf(a) - this.selectedColumns.indexOf(b)
      );

    /* Remove hidden columns from search */
    const modifyObject = (el: any) => {
      const sorted = sortedKeys(el);
      const result = {};

      sorted.forEach((item, _i) => {
        if (index(item) !== -1) {
          result[findTitle(item)] = el[item];
        }
      });

      return result;
    };

    /* OPTION FOR EXPORTING DATA */
    let data;

    switch (true) {
      case type === 'template': {
        data = [
          [...this.displayedColumns.map((el) => el.col_name)]
            .filter((el) => el !== 'action')
            .reduce((ac, a) => ({ ...ac, [a]: '' }), {}),
        ];
        break;
      }

      case type === 'all': {
        data = [...this.listDataSource].map((el) => modifyObject(el));
        break;
      }

      case type === 'selected': {
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
      panelClass: 'success-snackbar',
    });
  }
}
