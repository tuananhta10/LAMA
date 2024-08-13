import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild,
  AfterViewInit
} from '@angular/core';
import { Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import {
  displayedColumns,
  selectedColumns,
  selectedColumnsMobile,
  tableController,
  download_template,
  sample_data_template
} from '../../utils/employee-list-actions-model';
import { EmployeeList } from '../../utils/employee-list-model';
import { EditColumnDialogComponent } from '../../dialogs/edit-column-dialog/edit-column-dialog.component';
import { DeleteRowDialogComponent } from '../../dialogs/delete-row-dialog/delete-row-dialog.component';
import { GenerateEmployeeReportComponent } from '../../dialogs/generate-employee-report/generate-employee-report.component';
import { EmployeeListSimpleDetailDialogComponent } from '../../dialogs/employee-list-simple-detail-dialog/employee-list-simple-detail-dialog.component';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EmployeeListActionTypes } from '@app-admin-store/actions/admin-employees.actions';
import { EmployeeListState  } from '@app-admin-store/reducers/admin-employees.reducer';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest, 
  Subject
} from 'rxjs';
import { parseArrayObject } from '@main/shared/utils/parse.util';
import { takeUntil } from 'rxjs/operators';
import { FileUploadModalComponent } from '@main/shared/components';
import { DatePipe } from '@angular/common';
import { AdminHelper } from '@main/views/admin-panel/utils/helper';

@Component({
  selector: 'admin-employee-list-table',
  animations: [mainAnimations],
  templateUrl: './employee-list-table.component.html',
  styleUrls: ['./employee-list-table.component.scss'],
  providers:[DatePipe]
})
export class EmployeeListTableComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;

  public employeeList: any[] = [];
  public loading: boolean = true;
  private req: Subscription;
  private employeesData$: any;
  private unsubscribe$ = new Subject<void>();

  // column and table controls
  public tableController: any = tableController;
  public displayedColumns: any[] = displayedColumns;
  public selectedColumns: string[] = selectedColumns;
  public selectedColumnsMobile: string[] = selectedColumnsMobile;

  // for filtering
  public search: string = '';
  public dataSource = new MatTableDataSource<EmployeeList>(this.employeeList);
  public selectedRows: EmployeeList[] = [];

  // pagination option 
  public maxRows: number = 25;
  public page: number = 1;
  public pageNumbers: number = 1;
  public paginate: number[] = [];

  public dbClickActive: boolean = false;
  public status: any[] = [
    {
      title: "All Employees", 
      status: ''
    },

    {
      title: "Active Employees",
      status: 'active'
    },

    {
      title: "Pending Employees",
      status: 'pending'
    },

    {
      title: "Draft Employees",
      status: 'draft'
    },

    {
      title: "Inactive Employee",
      status: 'inactive'
    },

    {
      title: "Synced Employees",
      status: 'synced'
    },

    {
      title: "Employees for Checking",
      status: 'not-synced'
    },
  ];
  public selectedStatus: any = this.status[0];

  constructor(private router: Router,
    private employeeListStore: Store<EmployeeListState>,
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar,
    private datePipe:DatePipe,
    public dialog: MatDialog) { 
    this.employeesData$ = this.employeeListStore.pipe(select(state => state));
  }

  statusCounter(): number {
    let countEmployee;

    if(this.selectedStatus?.status === 'synced'){
      countEmployee = this.employeeList.filter(el => el?.status === 'active' && (el?.xero_id && el?.xero_status === 'ok'));  

    }

    else if(this.selectedStatus?.status === 'not-synced'){
      countEmployee = this.employeeList.filter(el => el?.status === 'active' && (!el?.xero_id || el?.xero_status !== 'ok'));  

    }

    else{
      countEmployee = this.employeeList.filter(el => el?.status?.toLowerCase() === this.selectedStatus?.status?.toLowerCase());  

    }

    return countEmployee?.length;
  }

  ngOnInit(): void {
    this.getEmployeeData();
    console.log(this.employeeList)
  }

  ngOnDestroy(): void{
    if(this.req) this.req.unsubscribe();
  }

  // employee list data
  getEmployeeData(){
    let action_type = [
      EmployeeListActionTypes.GET_EMPLOYEE_LIST, 
    ];

    // Loop to all action types
    action_type.forEach((item: any) => this.employeeListStore.dispatch({ type: item }));

    this.loading = true;

    // Subscribe to storage
    this.req = this.employeesData$.subscribe((results: any) => {
      this.changePage(0);

      if(results){
        // from ngrx store
        this.employeeList = results?.employees.employeeList
        this.dataSource.data = [...this.employeeList].slice(0, this.maxRows);

        this.pageNumbers = Math.ceil([...this.employeeList].length / this.maxRows);

        this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
        this.loading = results?.employees.employeeListPending;

        if(results.employees.employeeUpload){
          if(results.employees.employeeUpload.result.toLowerCase() === 'failed'){
            this.snackBar.open(results.employees.employeeUpload.message, "", {
              duration: 4000,
              panelClass:'error-snackbar'
            });
          } else {
            this.snackBar.open('Successfully updated employee record', "", {
              duration: 4000,
              panelClass:'success-snackbar'
            });
          }

          this.employeeListStore.dispatch({
            type: EmployeeListActionTypes.UPLOAD_EMPLOYEE_SUCCESS,
            payload: null
          }); 
        }
      }

      // Subscribe to deletion
      if(results?.employees?.deletedData && !results?.employees.deleteEmployeePending) this.deleteEmployeeData(results);
    });
  }

  // delete employee data from list
  deleteEmployeeData(result){
    const selectorRowsID = this.selectedRows.map(el => el.id);
    
    this.snackBar.open(`You successfully deleted employee data.`, '', {
      panelClass: 'success-snackbar',
      duration: 4000
    });

    this.selectedRows = [];
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  repaginate(list: any[]): void{
    this.pageNumbers = Math.ceil(list.length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
    this.page = 1;
  }

  clearFilters() {
    this.search = ""
    this.dataSource.data = [...this.employeeList].slice(0, this.maxRows);

    this.pageNumbers = Math.ceil([...this.employeeList].length / this.maxRows);

    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
    this.page = 1;
  }
  /* Filter employee list by status
    @params
      - item: filter by status
  */
  filterByStatus(item: any){
    console.log(item)
    if(item?.status === 'synced'){
      const employeeList = [...this.employeeList].filter(el => item.status ? el?.status === 'active' && el?.xero_id && el?.xero_status === 'ok' : el)

      this.dataSource.data =  employeeList.slice(0, this.maxRows);
      this.selectedStatus = item;
      this.repaginate(employeeList);
    }

    else if(item?.status === 'not-synced'){
      const employeeList = [...this.employeeList].filter(el => item.status ? el?.status === 'active' && (!el?.xero_id || el?.xero_status !== 'ok') : el)

      this.dataSource.data =  employeeList.slice(0, this.maxRows);
      this.selectedStatus = item;
      this.repaginate(employeeList);
    }

    else {
      const employeeList = [...this.employeeList].filter(el => item.status ? el.status?.toLowerCase() === item?.status?.toLowerCase() : el)

      this.dataSource.data =  employeeList.slice(0, this.maxRows);
      this.selectedStatus = item;
      this.repaginate(employeeList);
    }
  }

  
  /*
    Adjust max number of items shown for employee list
      @params
        - limit: number (max number of items per page)
  */
  adjustNumberOfItems(limit: number = 10): void {
    const employeeList = [...this.employeeList].filter(el => this.selectedStatus.status ? el.status === this.selectedStatus?.status : el)

    this.dataSource.data = employeeList.slice(0, limit);
    this.maxRows = limit;
    this.repaginate(employeeList);
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
    const employeeList = [...this.employeeList].filter(el => this.selectedStatus.status ? el.status?.toLowerCase() === this.selectedStatus?.status?.toLowerCase() : el)

    this.dataSource.data = employeeList.slice(temp - this.maxRows, temp);
    this.page = page;

    //if(this.maxRows > 5) window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
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
    Employee list table filter
  */
  searchDataSource(): void {
    const employeeList = [...this.employeeList]
    .filter(el => this.selectedStatus.status ? el.status.toLowerCase() === this.selectedStatus?.status.toLowerCase() : el)
    .filter(el => {
      let transformed = {
        "age": el.age,
        "id": el.id,
        "first_name": el.first_name, 
        "last_name": el.last_name, 
        "name": el.name, 
        "email_address": el.email_address,
        "date_added": el.date_added,
        "private_email": el.private_email,
        "mobile_phone": el.mobile_phone_no,
        "work_phone": el.work_phone_no,
        "home_phone_no": el.home_phone_no,
        "suburb": el.suburb,
        "branch_name": el.branch_name,
        "address_a": el.address_a,
        "state": el.state,
        "post_code": el.post_code,
        "gender": el.gender,
        "preferred_name": el.preferred_name,
        "job_type": el.job_type,
        "employment_type": el.employment_type,
        "type": el.type,
        "employee_position_display_name": el?.employee_position_display_name,
        "status": el.status
      };

      let result = [];

      
      if(this.search === 'sync' && el?.status === 'active'){
        return el?.status === 'active' && (el?.xero_id && el?.xero_status === 'ok')
      }

      else if(this.search === 'not sync' && el?.status === 'active'){
        return el?.status === 'active' && (!el?.xero_id || el?.xero_status !== 'ok')
      }
      
      else {
        /* Remove hidden columns from search */
        for(let item in transformed){
          let index = this.selectedColumns.indexOf(item) 
          let name = this.selectedColumns.indexOf('name');

          /* OTHER DATA */
          if(index === -1 && (item !== 'first_name' && item !== 'last_name' && item !== 'name' && item !== 'name_2')){
            delete transformed[item];
          }

          else if(transformed[item] && (item !== 'first_name' && item !== 'last_name' && item !== 'name' && item !== 'name_2')) 
            result.push(transformed[item]);
          
          /* NAME ONLY */
          if(name === -1 && (item == 'first_name' || item == 'last_name' ||  item == 'name' ||    item == 'name_2')){
            delete transformed[item];
          }

          else if(index === -1 && transformed[item]) 
            result.push(transformed[item]);
        }
      }
      
      return JSON.stringify(result).toLowerCase().includes(this.search.toLowerCase());
    });

    this.dataSource.data = employeeList.slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...employeeList].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);;
    this.page = 1;

  }

  /* 
    Select row from list 
    @params 
      - row : Employee List row
  */
  selectRows(row: any){
    let index = this.selectedRows.findIndex(el => el.id === row.id);
    
    if(!this.dbClickActive){
    
      if(index > -1)
        this.selectedRows.splice(index, 1);
      
      else 
        this.selectedRows = [...this.selectedRows, row];
      
    }
  }

  /* 
    View employee details
    @params 
      - row : Employee List row
      - id : Employee id
  */
  viewDetails(row: any, id: number): void{
    console.log("NAVIGATE", row?.id)
    /*this.router.navigate([`/admin/employees/details/${row?.id}`])*/
    this.openDialog('details')
  }

  
  /*
    Open dialog component 
      @params 
        - action_type : What kind of dialog should open
  */
  openDialog(action_type: string): void {
    if(action_type === 'edit-column') this.editColumn();
    else if(action_type === 'delete') this.deleteRows();
    else if(action_type === 'import') this.uploadEmployees();
    else if(action_type === 'report') this.generateReport();
  }

  public download_template: any = download_template;

  generateReport(){
    let reportDialog = this.dialog.open(
      GenerateEmployeeReportComponent,
      { 
        minWidth: '423px',
        maxHeight: '96vh',
        maxWidth: '98vw',
        data: {
          employees: this.employeeList,  
          title: "Generate Employee List Report"
        },
      }
    );
  }

  uploadEmployees(){
    let uploadDialog = this.dialog.open(
      FileUploadModalComponent,
      { 
        minWidth: '30vw',
        data: {
          fileType: '.csv',
          fileTypeArray: ['.csv']
        },
      }
    );

    uploadDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      if(result){
        let data = {
          endpoint: 'employee',
          delete: false,
          attachment: result
        }

        this.snackBar.open("Upload in-progress. Please don't change the page while upload is in progress.", "", {
          panelClass:'success-snackbar'
        });

        this.employeeListStore.dispatch({
          type: EmployeeListActionTypes.UPLOAD_EMPLOYEE,
          payload: data
        }); 
      }
    });
  }

  /* View Detail Dialog
  */
  viewDetailDialog(row): void{
    const selectedEmployee = [...this.employeeList].find(el => el.id === row?.id);


    // open edit column dialog
    const dialogRef = this.dialog.open(EmployeeListSimpleDetailDialogComponent, {
      panelClass: "dialog-responsive",
      data: {
        employeeDetail: selectedEmployee
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dbClickActive = false;
      //this.selectRows(selectedEmployee);
      console.log('The dialog was closed',  this.dbClickActive );
    });

    console.log(selectedEmployee)
  }



  /*
    Edit column dialog component
  */
  editColumn(): void {
    // open edit column dialog
    const dialogRef = this.dialog.open(EditColumnDialogComponent, {
      panelClass: "dialog-responsive",
      data: {
        displayedColumns: this.displayedColumns, 
        selectedColumns: this.selectedColumns
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result) 
        this.selectedColumns = result.selectedColumns.map(el => el.col_name);

        // sort by selected columns
        this.displayedColumns = this.displayedColumns.sort((a,b) => 
          this.selectedColumns.indexOf(a.title) - this.selectedColumns.indexOf(b.title))

        localStorage.setItem('selected_employee_columns', this.selectedColumns.toString());
    });
  }

  /* 
    Delete Row from employee list table
  */
  deleteRows(): void {
    // open delete row dialog
    const dialogRef = this.dialog.open(DeleteRowDialogComponent, {
      panelClass: "dialog-responsive",
      data: {
        selectedRows: this.selectedRows,
        cancel: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result && !result.cancel){
        this.selectedRows = result.selectedRows;
        const selectorRowsID = this.selectedRows.map(el => el.id);

        // update list
        this.loading = true;
        this.employeeListStore.dispatch({ type: EmployeeListActionTypes.DELETE_EMPLOYEE_LIST, payload: selectorRowsID });
        
        setTimeout(() => {
          this.employeeListStore.dispatch({ type: EmployeeListActionTypes.GET_EMPLOYEE_LIST });
        }, 1000);
      }
    });
  }

  public sample_data_template: any = sample_data_template;


  exportAsXLSX(type?):void { 
    /* Find index  */
    const index = (item) => this.download_template.map(el => el.col_name).indexOf(item); 
    /* Find title from columns */
    const findTitle = (col_name: any) => this.download_template.find((el) => el.col_name === col_name)["col_name"];
    /* Sort columns by keys */
    const sortedKeys = (el) => Object.getOwnPropertyNames(el)//.sort((a,b) => this.download_template.map(item => item?.col_name).indexOf(a) - this.displayedColumns.map(item => item?.col_name).indexOf(b));
    
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
        data =  [...this.sample_data_template].map((el) => modifyObject(el));
        break;
      }

      case (type === 'all'): {
        data = [...this.employeeList].map((el) => modifyObject(el));
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
    let exportData = [...data].map(el => {
      let claimFile = {
        "id":el?.id, // participant registration number
        "name": `${el?.first_name} ${el?.last_name}`,
        "employment type": el?.employment_type || '',
        "job type": el?.job_type,
        "email": el?.email_address || '',
        "mobile phone": el?.mobile_phone_no || '',
        "home phone": el?.el?.first_name || '',
        "date started": el?.date_started ? this.datePipe.transform(new Date()) : el?.date_started,
        "first name": el?.first_name || '',
        "last name": el?.last_name || '',
        "default branch": el?.branch_name || '',
        "post code":  el?.post_code || '',
        "state": el?.state || '',
        "suburb": el?.suburb || ''
      }
      return claimFile;
    });

    this.excelService.exportAsExcelFile(exportData, `Employees`);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }

}
