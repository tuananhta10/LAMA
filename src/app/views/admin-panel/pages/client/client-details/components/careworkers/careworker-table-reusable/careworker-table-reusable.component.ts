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

import {
  displayedColumns,
  selectedColumns,
  selectedColumnsProfile,
  selectedColumnsMobile,
  tableController
} from '@app-employees/employee-main/utils/employee-list-actions-model';

import { EmployeeList } from '@app-employees/employee-main/utils/employee-list-model';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-careworker-table-reusable',
  animations: [mainAnimations],
  templateUrl: './careworker-table-reusable.component.html',
  styleUrls: ['./careworker-table-reusable.component.scss']
})
export class CareworkerTableReusableComponent implements OnInit {

  @Input() loading: boolean = true;
  @Input() employeeList: EmployeeList[] = [];
  @Input() withHeader: boolean = true;
  @Output() updateSelectedRows: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteSingleRow: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatSort) sort: MatSort;

  // column and table controls
  public tableController: any = tableController;
  @Input() displayedColumns: any[] = displayedColumns;
  @Input() selectedColumns: string[] = selectedColumnsProfile;
  @Input() selectedColumnsMobile: string[] = selectedColumnsMobile;
  @Input() tableNumber: number = 0;

  // for filtering
  public search: string = '';
  public dataSource = new MatTableDataSource<EmployeeList>(this.employeeList);
  public selectedRows: EmployeeList[] = [];

  // pagination option 
  public maxRows: number = 5;
  public page: number = 1;
  public pageNumbers: number = 1;
  public paginate: number[] = [];

  public dbClickActive: boolean = false;
  
  constructor(private router: Router,
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { 

  }

  ngOnInit(): void {
    //this.employeeList = [];
    //this.filterByStatus(); // filter client list by status
    this.dataSource.data = [...this.employeeList].slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...this.employeeList].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
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
    const employeeList = [...this.employeeList];

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
    const employeeList = [...this.employeeList];

    this.dataSource.data = employeeList.slice(temp - this.maxRows, temp);
    this.page = page;
  }


  /*
    Employee list table filter
  */
  searchDataSource(): void {
    const employeeList = [...this.employeeList]
    .filter(el => {
      let transformed = {
        "age": el.age,
        "id": el.id,
        "first_name": el.first_name, 
        "last_name": el.last_name, 
        "name": `${el.first_name} ${el.last_name}`,
        "date_added": el.date_added,
        "email": el.email_address,
        "mobile_phone": el.mobile_phone_no,
        "work_phone": el.work_phone_no,
        "home_phone_no": el.home_phone_no,
        "suburb": el.suburb,
        "branch_name": el.branch_name,
        "state": el.state,
        "post_code": el.post_code,
        "status": el.status
      };

      /* Remove hidden columns from search */
      for(let item in transformed){
        let index = this.selectedColumns.indexOf(item) 

        if(index === -1)
          delete transformed[item];
      }
      
      return JSON.stringify(transformed).toLowerCase().includes(this.search.toLowerCase());
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

      // update selected rows from parent
      this.updateSelectedRows.emit({
        tableNumber: this.tableNumber,
        selectedRows: this.selectedRows
      }); 
    }
  }

  deleteSingleRowData(row: any): void{
    this.deleteSingleRow.emit({ row: row })
  }

  /* 
    View client details
    @params 
      - row : Employee List row
      - id : Employee id
  */
  viewDetails(row: any, id: number): void{
    console.log("NAVIGATE", row?.id)
    /*this.router.navigate([`/admin/clients/details/${row?.id}`])*/
    this.openDialog('details')
  }

  
  /*
    Open dialog component 
      @params 
        - action_type : What kind of dialog should open
  */
  openDialog(action_type: string): void {
    //if(action_type === 'edit-column') this.editColumn();
    //else if(action_type === 'delete') this.deleteRows();
  }

  /* View Detail Dialog
  */
  viewDetailDialog(row): void{
    const selectedEmployee = [...this.employeeList].find(el => el.id === row?.id);


    // open edit column dialog
    /*const dialogRef = this.dialog.open(EmployeeListSimpleDetailDialogComponent, {
      panelClass: "dialog-responsive",
      data: {
        clientDetail: selectedEmployee
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dbClickActive = false;
      //this.selectRows(selectedEmployee);
      console.log('The dialog was closed',  this.dbClickActive );
    });

    console.log(selectedEmployee)*/
  }

}
