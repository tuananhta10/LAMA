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
  selector: 'app-participant-funding-list-view',
  animations: [mainAnimations],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ParticipantFundingListViewComponent),
      multi: true
    },
    { provide: DateAdapter, useClass: CustomDateAdapter }
  ],
  templateUrl: './participant-funding-list-view.component.html',
  styleUrls: ['./participant-funding-list-view.component.scss']
})
export class ParticipantFundingListViewComponent implements OnInit {

  @Input() loading: boolean = true;
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = [];
  @Input() withHeader: boolean = true;
  @Input() searchSource: any;
  @Input() withFolder: boolean = false;
  @Input() showStatData: boolean = true;
  @Input() exportable: boolean = true;
  @Input() displayedColumns: any[] = [];
  @Input() selectedColumns: string[] = [];
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
  @Input() maxRows: number = 10;
  @Input() withImport: boolean = false;
  @Input() mockExportData: any = {};
  @Output() import: EventEmitter<any> = new EventEmitter<any>();

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
      name:'New Record',
      class: 'new',
      icon: '/assets/images/icons/carousel-add.png',
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

  ngOnInit(): void {
    //this.listDataSource = [];
    //this.filterByStatus(); // filter client list by status
    this.dataSource.data = [...this.listDataSource].slice(0, this.maxRows);
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
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  repaginate(list: any[]): void{
    this.pageNumbers = Math.ceil(list.length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
    this.page = 1;
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
        console.log(new Date(el[this.dateSource] * 1000))
        let dateFromCondition = new Date(el[this.dateSource] * 1000) >= new Date(this.dateSearch?.dateFrom);
        let dateToCondition = new Date(el[this.dateSource] * 1000) <= new Date(this.dateSearch?.dateTo);

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
    let index = this.selectedRows.findIndex(el => (el?.id === row?.id));

    console.log(index)

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

  /*
    Open dialog component
      @params
        - action_type : What kind of dialog should open
  */
  openDialog(action_type: string, data: any): void {
    //console.log(action_type, data)

    if(action_type === 'new') {
      this.updateSelectedRowDialog.emit({
        action: action_type,
        data: data
      });
    }

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

}
