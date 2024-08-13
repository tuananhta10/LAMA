import { 
  Component, 
  OnInit, 
  Input, 
  ViewChild,
  AfterViewInit,
  HostListener,
  ElementRef
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';

import { displayedColumnsClients,
  selectedColumnsClients,
  selectedColumnsMobileClients,
  tableController
 } from './clients-table-model';
import { EmployeeClients } from '../../../../employee-main/utils/employee-list-model';
import { EditColumnDialogComponent } from '../../../../employee-main/dialogs/edit-column-dialog/edit-column-dialog.component';
import { DeleteRowDialogComponent } from '../../../../employee-main/dialogs/delete-row-dialog/delete-row-dialog.component';
//import { ClientListSimpleDetailDialogComponent } from '../../dialogs/client-list-simple-detail-dialog/client-list-simple-detail-dialog.component';

import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { EmployeeState } from '@main/views/admin-panel/store/reducers/admin-employee.reducer';
import { EmployeeActionTypes } from '@main/views/admin-panel/store/actions/admin-employee.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'employee-clients-table',
  animations: [mainAnimations],
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.scss']
})
export class ClientsTableComponent implements OnInit {
  @Input() loading: boolean = true;
  @Input() clientList: any[] = [];
  @Input() pastClients: any[] = [];
  @Input() newClients: any[] = [];
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('tableContainer') tableContainer: ElementRef<HTMLDivElement>;

  id:any;
  private req: Subscription;
  employee$: any;
  careWorkerList:any[] = [];


  // column and table controls
  public tableController: any = tableController;
  public displayedColumns: any[] = displayedColumnsClients;
  public selectedColumns: string[] = selectedColumnsClients;
  public selectedColumnsMobile: string[] = selectedColumnsMobileClients;
  public selectedRows: any[] = [];
  public screenWidth: number | 1200;

  constructor(private router: Router,
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private employeeStore: Store<EmployeeState>) { 
      this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.setTableWidth();
    this.subscribeEmployee();
    this.getEmployee();
  }

  getEmployee(){
    let data = {
      type: 'employee-careworker',
      id: this.id,
      key: 'careWorkersDetail'
    }
    this.employeeStore.dispatch({
      type: EmployeeActionTypes.GET_EMPLOYEE,
      payload: data
    });
  }

  subscribeEmployee(){
    this.employee$ = this.employeeStore.pipe(select(state => state.employee));
    this.req = this.employee$.subscribe((results: any) => {
      if( results?.employee?.careWorkersDetail?.client_employee){
        results?.employee?.careWorkersDetail?.client_employee.forEach(element => {
          this.careWorkerList.push(element.client[0])
        });
      }
      this.loading = results?.pending;
    })
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

        localStorage.setItem('selected_employee_client_columns', this.selectedColumns.toString());
    });
  }

  /* 
    Delete Row from client list table
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
        const clients = [...this.clientList, ...this.pastClients].filter((el) => !newSelected.find(_el => _el.id === el.id));
        this.filterDeletion(clients);
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
        const clients = [...this.clientList, ...this.pastClients].filter((el) => !newSelected.find(_el => _el.id === el.id));
        this.filterDeletion(clients);
        setTimeout(() => this.loading = false, 500);
        this.selectedRows = [];
      }
    });
  }

  // Filter for deletions
  filterDeletion([...clients]){
    this.clientList = clients.filter(el => el.status === 'Active');
    this.pastClients = clients.filter(el => el.status === 'Inactive');
    this.newClients = clients.filter(el => el.status === 'Active').slice(0, 3);
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
      case (type === 'new'): {
        data = [...this.newClients].map((el) => modifyObject(el));
        break;
      }

      case (type === 'past'): {
        data = [...this.pastClients].map((el) => modifyObject(el));
        break;
      }

      case (type === 'active'): {
        data = [...this.clientList].map((el) => modifyObject(el));
        break;
      }

      default: {
        data = [...this.clientList, ...this.pastClients].map((el) => modifyObject(el));
        break;
      }
    }

    this.excelService.exportAsExcelFile(data,`${type}clientList`);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }
}
