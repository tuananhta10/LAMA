import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild,
  AfterViewInit,
  HostListener,
  ElementRef
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
import { EditColumnDialogComponent } from '../../../../client-main/dialogs/edit-column-dialog/edit-column-dialog.component';
import { DeleteRowDialogComponent } from '../../../../client-main/dialogs/delete-row-dialog/delete-row-dialog.component';
//import { EmployeeListSimpleDetailDialogComponent } from '../../dialogs/employee-list-simple-detail-dialog/employee-list-simple-detail-dialog.component';

import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-employee-careworker-table',
  animations: [mainAnimations],
  templateUrl: './careworker-table.component.html',
  styleUrls: ['./careworker-table.component.scss']
})
export class CareworkerTableComponent implements OnInit {
  @Input() loading: boolean = true;
  @Input() employeeList: any[] = [];
  @Input() employeeNotUse: any[] = [];
  @Input() brokerage: any[] = [];
  @Input() clientData: any;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tableContainer') tableContainer: ElementRef<HTMLDivElement>;


  // column and table controls
  public tableController: any = tableController;
  public displayedColumns: any[] = displayedColumns;
  public selectedColumns: string[] = selectedColumnsProfile;
  public selectedColumnsMobile: string[] = selectedColumnsMobile;

  public brokerageColumns:any[] = [
    {title: 'Default', col_name: 'default'}, 
    {title: 'Brokerage No.', col_name: 'brokerage_number'}, 
    {title: 'Name', col_name: 'name'}, 
    {title: 'Contact Name', col_name: 'contact_name'},
    {title: 'Contact No.', col_name: 'contact_number'}
  ];
  public brokerageSelected: any[] = this.brokerageColumns.map(el => el.col_name);
  public selectedRows: any[] = [];
  public screenWidth: number | 1200;

  constructor(private router: Router,
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { 
    console.log(this.employeeList)
  }

  navigateToClientEdit(){
    sessionStorage.setItem('clientFormStep', '4');
    this.router.navigate([`/admin/clients/edit/${this.clientData?.id}`]);
  }

  ngOnInit(): void {
    this.setTableWidth();
  }

  // on window resize
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.setTableWidth()
  }

  setTableWidth(): void {
    setTimeout(() => {
      if(this.tableContainer){
        // Automatically expand the video to fit the page up to 1200px x 720px
        this.screenWidth = Math.min(this.tableContainer.nativeElement.clientWidth - 40, 1200);
      }
    }, 300);
  }

  updateSelectedRows(row){
    let index = this.selectedRows.findIndex(el => el.tableNumber === row.tableNumber)

    if(index === -1){
      this.selectedRows.push(row)
    }

    else this.selectedRows[index].selectedRows = row.selectedRows;
  }
  
  /*
    Open dialog component 
      @params 
        - action_type : What kind of dialog should open
  */
  openDialog(action_type: string): void {
    if(action_type === 'edit-column') this.editColumn();
    else if(action_type === 'delete') this.deleteRows();
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

        localStorage.setItem('selected_employee_employee_columns', this.selectedColumns.toString());
    });
  }

  /* 
    Delete Row from employee list table
  */
  deleteRows(): void {
    let flattenSelectedRows = this.selectedRows
    .map(el => el.selectedRows)
    .reduce((accumulator, value) => accumulator.concat(value), [])
    .filter((arr, index, self) => index === self.findIndex((item) => item.id === arr.id));

    console.log(flattenSelectedRows)

    // open delete row dialog
    const dialogRef = this.dialog.open(DeleteRowDialogComponent, {
      panelClass: "dialog-responsive",
      data: {
        selectedRows: flattenSelectedRows,
        cancel: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result && !result.cancel){
        const newSelected = result.selectedRows;

        console.log("UPDATING STORAGE", newSelected)

        // update list
        const employees = [...this.employeeList, ...this.employeeNotUse].filter((el) => !newSelected.find(_el => _el.id === el.id));
        this.filterDeletion(employees);
        setTimeout(() => this.loading = false, 500);
        this.selectedRows = [];
      }
    });
  }

  /*
    DELETE SINGLE ROW DATA
  */
  deleteSingleRowData(data){
    // open delete row dialog
    const dialogRef = this.dialog.open(DeleteRowDialogComponent, {
      panelClass: "dialog-responsive",
      data: {
        selectedRows: [data.row],
        cancel: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result && !result.cancel){
        const newSelected = result.selectedRows;

        console.log("UPDATING STORAGE", newSelected)

        // update list
        const employees = [...this.employeeList, ...this.employeeNotUse].filter((el) => !newSelected.find(_el => _el.id === el.id));
        this.filterDeletion(employees);
        setTimeout(() => this.loading = false, 500);
        this.selectedRows = [];
      }
    });
  }

  // Filter for deletions
  filterDeletion([...employees]){
    this.employeeList = employees.filter(el => el.status === 'Active');
    this.employeeNotUse = employees.filter(el => el.status === 'Inactive');
    this.brokerage = employees.filter(el => el.status === 'Active').slice(0, 3);
    this.loading = true;
  }

  exportAsXLSX(type: string = 'all'):void { 
    /* Find index  */
    const index = (item) => this.selectedColumns.indexOf(item); 
    /* Find title from columns */
    const findTitle = (col_name: any) => this.displayedColumns.find((el) => el.col_name === col_name)["title"];
    /* Sort columns by keys */
    const sortedKeys = (el) => Object.getOwnPropertyNames(el).sort((a,b) => this.selectedColumns.indexOf(a) - this.selectedColumns.indexOf(b));
    
    /* Remove hidden columns from search */
    const modifyObject = (el: any) => {
      const sorted = sortedKeys(el);
      const result = {};

      sorted.forEach((item, _i) => {
        if(item === 'first_name') 
          result['Name'] = `${el['first_name']} ${el['last_name']}`;
        
        else if(index(item) !== -1 && item !== 'first_name') {
          result[findTitle(item)] = el[item];
        }
      });

      return result;
    }

    /* OPTION FOR EXPORTING DATA */
    let data;

    switch (true){
      case (type === 'new' && this.brokerage?.length > 0): {
        data = [...this.brokerage].map((el) => modifyObject(el));
        break;
      }

      case (type === 'past'): {
        data = [...this.employeeNotUse].map((el) => modifyObject(el));
        break;
      }

      case (type === 'active'): {
        data = [...this.employeeList].map((el) => modifyObject(el));
        break;
      }

      default: {
        data = [...this.employeeList, ...this.employeeNotUse].map((el) => modifyObject(el));
        break;
      }
    }

    this.excelService.exportAsExcelFile(data,`${type}employeeList`);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }

}
