import { 
  Component, 
  OnInit, 
  OnDestroy,
  Input, 
  ViewChild,
  AfterViewInit,
  HostListener
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
} from '../../utils/client-list-actions-model';
import { ClientList } from '../../utils/client-list-model';
import { EditColumnDialogComponent } from '../../dialogs/edit-column-dialog/edit-column-dialog.component';
import { DeleteRowDialogComponent } from '../../dialogs/delete-row-dialog/delete-row-dialog.component';
import { ClientListSimpleDetailDialogComponent } from '../../dialogs/client-list-simple-detail-dialog/client-list-simple-detail-dialog.component';
import { GenerateReportGlobalComponent } from '@main/shared/components/generate-report-global/generate-report-global.component';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest, 
  Subject
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { FileUploadModalComponent } from '@main/shared/components';
import { takeUntil } from 'rxjs/operators';
import { 
  columns as reportColumn,  
  selectedColumns as reportSelectedColumn
} from '../../utils/client-report-model-interface';

@Component({
  selector: 'admin-client-list-table',
  animations: [mainAnimations],
  templateUrl: './client-list-table.component.html',
  styleUrls: ['./client-list-table.component.scss']
})
export class ClientListTableComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatSort) sort: MatSort;

  private req: Subscription;
  private clientsData$: any;
  private deleteClientData$: any;
  public clientList: any[] = [{'name': ''}];

  // column and table controls
  public tableController: any = tableController;
  public displayedColumns: any[] = displayedColumns;
  public selectedColumns: string[] = selectedColumns;
  public selectedColumnsMobile: string[] = selectedColumnsMobile;

  // for filtering
  public search: string = '';
  public dataSource = new MatTableDataSource<ClientList>(this.clientList);
  public selectedRows: ClientList[] = [];
  public navbarScrolled: boolean = false;

  // pagination option 
  public maxRows: number = 25;
  public page: number = 1;
  public pageNumbers: number = 1;
  public paginate: number[] = [];
  public dbClickActive: boolean = false;
  public status: any[] = [
    {
      title: "All Participant", 
      status: ''
    },

    {
      title: "Active Participants",
      status: 'active'
    },

    {
      title: "Draft Participants",
      status: 'draft'
    },

    {
      title: "Pending Participants",
      status: 'pending'
    },

    {
      title: "Inactive Participants",
      status: 'inactive'
    },

    {
      title: "Synced Particpants",
      status: 'synced'
    },

    {
      title: "Particpants for Checking",
      status: 'not-synced'
    },
  ];
  public selectedStatus: any = this.status[0];
  public loading: boolean = true;
  private unsubscribe$ = new Subject<void>();

  public reportColumn = reportColumn;
  public reportSelectedColumn = reportSelectedColumn;

  constructor(private clientListStore: Store<ClientListState>,
    private router: Router,
    private excelService: ExcelDownloaderService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { 
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
  }


  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    
    this.navbarScrolled = scrollY > 100;
  }

  statusCounter(): number {
    let countClient;

    if(this.selectedStatus?.status === 'synced'){
      countClient = this.clientList.filter(el => el?.status === 'active' && (el?.xero_id && el?.xero_status === 'ok'));  

    }

    else if(this.selectedStatus?.status === 'not-synced'){
      countClient = this.clientList.filter(el => el?.status === 'active' && (!el?.xero_id || el?.xero_status !== 'ok'));  
    }

    else {
      countClient = this.clientList.filter(el => el?.status?.toLowerCase() === this.selectedStatus?.status?.toLowerCase());  
    }

    return countClient?.length;
  }

  public sortedHeader: string;

  sortData(header){
    console.log(this.dataSource?.data, this.clientList, header)
    this.sortedHeader = header;

    let sortedList = [...this.clientList].sort((a: any,b: any) => {
      if (header === 'date') {
        //console.log('date')
        const dateA = new Date(a[header]);
        const dateB = new Date(b[header]);
        if (dateA < dateB) {
          return this.sort.direction === 'asc' ? -1 : 1;
        } else if (dateA > dateB) {
          return this.sort.direction === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      } else if (typeof a[header] === 'string') {
        //console.log('string')
        const valueA = a[header].toLowerCase();
        const valueB = b[header].toLowerCase();
        if (valueA.localeCompare(valueB)) {
          return this.sort.direction === 'asc' ? -1 : 1;
        } else if (valueA > valueB) {
          return this.sort.direction === 'asc' ? 1 : -1;
        } else {
          return 0;
        }
      } else if (typeof a[header] === 'number') {
        //console.log('number')
        return this.sort.direction === 'asc' ? a[header] - b[header] : b[header] - a[header];
      } else {
        return 0;
      }
    });

    this.loading = true;
    setTimeout(() => {
      this.dataSource.data = sortedList.slice(0, this.maxRows)
      this.loading = false
    }, 500)
  }

  ngOnInit(): void {
    this.clientListStore.dispatch({ type: ClientListActionTypes.GET_CLIENT_LIST });
    this.getClientListData();
  }

  ngOnDestroy(): void{
    if(this.req) this.req.unsubscribe();
  }

  // client list data
  getClientListData(){
    // Loop to all action types
    this.loading = true;

    // Subscribe to storage
    this.req = this.clientsData$.subscribe((results: any) => {
      this.changePage(0);
      
      // Subscribe to list store
      if(!results?.clients?.deletedData){
        results?.clients?.clientList?.forEach(el => el['address'] = el?.address_a);

        this.clientList = results?.clients.clientList;
        //this.filterByStatus(this.status[1]);
      
        this.dataSource.data = [...this.clientList]/*.filter(el => el.status?.toLowerCase() == 'active')*/.slice(0, this.maxRows);
        this.pageNumbers = Math.ceil(
          ([...this.clientList]/*.filter(el => el.status?.toLowerCase() == 'active')*/
        ).length / this.maxRows);

        console.log(results.clients)
        
        this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
        this.loading = results?.clients.clientListPending;

        if(results.clients.clientUpload){
          if(results?.clients?.clientUpload?.result === 'Success'){
            this.snackBar.open('Successfully updated participant records', "", {
              duration: 4000,
              panelClass:'success-snackbar'
            });
          } else {
            this.snackBar.open("There has been an error with your import. Please try again later.", "", {
              duration: 4000,
              panelClass:'danger-snackbar'
            });
          }

          this.clientListStore.dispatch({
            type: ClientListActionTypes.UPLOAD_CLIENT_SUCCESS,
            payload: null
          }); 
        }
      }

      // Subscribe to deletion
      if(results?.clients?.deletedData && !results?.clients.deleteClientPending) this.deleteClientData(results);
    });
  }

  // delete client data from list
  deleteClientData(result){
    const selectorRowsID = this.selectedRows.map(el => el.id);
    
    this.snackBar.open(`You successfully deleted client data.`, '', {
      panelClass: 'success-snackbar',
      duration: 4000
    });

    this.selectedRows = [];

  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  /* Repaginate list after - filter, export, deletion 
    @params 
      - list: array of object (client list)
  */
  repaginate(list: any[]): void{
    this.pageNumbers = Math.ceil(list.length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);
    this.page = 1;
  }

  /* Filter client list by status
    @params
      - item: filter by status
  */
  filterByStatus(item: any){

    if(item?.status === 'synced'){
      const clientList = [...this.clientList].filter(el => item.status ? el?.status === 'active' && el?.xero_id && el?.xero_status === 'ok' : el)

      this.dataSource.data =  clientList.slice(0, this.maxRows);
      this.selectedStatus = item;
      this.repaginate(clientList);
    }

    else if(item?.status === 'not-synced'){
      const clientList = [...this.clientList].filter(el => item.status ? el?.status === 'active' && (!el?.xero_id || el?.xero_status !== 'ok') : el)

      this.dataSource.data =  clientList.slice(0, this.maxRows);
      this.selectedStatus = item;
      this.repaginate(clientList);
    }

    else {
      const clientList = [...this.clientList].filter(el => item.status ? el.status.toLowerCase() === item?.status.toLowerCase() : el)

      this.dataSource.data =  clientList.slice(0, this.maxRows);
      this.selectedStatus = item;
      this.repaginate(clientList);
    }
  }

  /*
    Adjust max number of items shown for client list
      @params
        - limit: number (max number of items per page)
  */
  adjustNumberOfItems(limit: number = 10): void {
    const clientList = [...this.clientList].filter(el => this.selectedStatus.status ? el.status === this.selectedStatus?.status : el)

    this.dataSource.data = clientList.slice(0, limit);
    this.maxRows = limit;
    this.repaginate(clientList);
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
    const clientList = [...this.clientList].filter(el => this.selectedStatus.status ? el.status?.toLowerCase() === this.selectedStatus?.status?.toLowerCase() : el)

    if(this.sortedHeader){
      console.log("HEADER AVAILABLE")
    }

    this.dataSource.data = clientList.slice(temp - this.maxRows, temp);
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

  convertDate(dateData){ 
    return new Date('Jan 1, 1990');
  }

  /*
    Client list table filter
  */
  searchDataSource(): void {
    const clientList = [...this.clientList]
    .filter(el => this.selectedStatus.status ? el.status === this.selectedStatus?.status : el)
    .filter(el => {
      let transformed = {
        "age": el.age,
        "id": el.id,
        "first_name": el.first_name, 
        "last_name": el.last_name, 
        "name": `${el.first_name} ${el.last_name}`,
        "name_2": `${el.last_name} ${el.first_name}`,
        "date_added": el.date_added,
        "email_address": el.email_address,
        "mobile_phone_no": el.mobile_phone_no,
        "work_phone_no": el.work_phone_no,
        "home_phone_no": el.home_phone_no,
        "suburb": el.suburb,
        "branch_name": el.branch_name,
        "state": el.state,
        "post_code": el.post_code,
        "preferred_gender": el.preferred_gender,
        "preferred_name": el.preferred_name,
        "type_of_service": el.type_of_service,
        "occupation": el.occupation,
        "disability_type": el.disability_type,
        "address": el.address,
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
          let name = this.selectedColumns.indexOf('first_name');

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

    this.dataSource.data = clientList.slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...clientList].length / this.maxRows);
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
    
    if(!this.dbClickActive){
    
      if(index > -1)
        this.selectedRows.splice(index, 1);
      
      else 
        this.selectedRows = [...this.selectedRows, row];
    }
  }

  /*
    Open dialog component 
      @params 
        - action_type : What kind of dialog should open
  */
  openDialog(action_type: string): void {
    if(action_type === 'edit-column') this.editColumn();
    else if(action_type === 'delete') this.deleteRows();
    else if(action_type === 'import') this.importClients();
    else if(action_type === 'report') this.generateReport();
  }

  generateReport(){
    let reportDialog = this.dialog.open(
      GenerateReportGlobalComponent,
      { 
        minWidth: '423px',
        maxHeight: '97vh',
        maxWidth: '98vw',
        data: {
          data_list: this.clientList,  
          title: "Generate Participant List Report",
          sub_title: "Participants",
          displayedColumns: this.reportColumn,
          selectedColumns: this.reportSelectedColumn,
          showDateFilter: true,  
          filterBy: 'Entry Date',
          dateSearch: {
            dateFrom: 'Entry Date',  
            dateTo: 'Entry Date'
          },
          groupItems: true,  
          groupBy: "Branch"
        },
      }
    );
  }

  importClients(){
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
          endpoint: 'client',
          delete: false,
          attachment: result
        }

        this.snackBar.open("Upload in-progress. Please don't change the page while upload is in progress.", "", {
          panelClass:'success-snackbar'
        });
        
        this.clientListStore.dispatch({
          type: ClientListActionTypes.UPLOAD_CLIENT,
          payload: data
        }); 
      }
    });
  }

  /* View Detail Dialog
  */
  viewDetailDialog(row): void{
    const selectedClient = [...this.clientList].find(el => el.id === row?.id);
    // open edit column dialog
    const dialogRef = this.dialog.open(ClientListSimpleDetailDialogComponent, {
      panelClass: "dialog-responsive",
      data: {
        clientDetail: selectedClient
      },
      autoFocus: false 
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dbClickActive = false;
      //this.selectRows(selectedClient);
      console.log('The dialog was closed',  this.dbClickActive );
    });
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

        localStorage.setItem('selected_client_columns', this.selectedColumns.toString());
    });
  }

  /* 
    Delete Row from client list table
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

        this.loading = true;
        this.clientListStore.dispatch({ type: ClientListActionTypes.DELETE_CLIENT_LIST, payload: selectorRowsID });
        
        setTimeout(() => {
          this.clientListStore.dispatch({ type: ClientListActionTypes.GET_CLIENT_LIST });
        }, 1000);
      }
    });
  }

  public download_template: any = download_template;
  public sample_data_template: any = sample_data_template;
  /* Export json as excel sheet
    @params
      - type (type of export either export all, export selected, export current list view)
  */
  exportAsXLSX(type?):void { 
    /* Find index  */
    const index = (item) => this.displayedColumns.map(el => el.col_name).indexOf(item); 
    /* Find title from columns */
    const findTitle = (col_name: any) => this.displayedColumns.find((el) => el.col_name === col_name)["col_name"];
    
    /* Find index  */
    const indexTemplate = (item) => this.download_template.map(el => el.col_name).indexOf(item); 
    /* Find title from columns */
    const findTitleTemplate = (col_name: any) => this.download_template.find((el) => el.col_name === col_name)["col_name"];
    
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
        data = [...this.clientList].map((el) => modifyObject(el));
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

    this.excelService.exportAsExcelFile(data, `Clients`);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }
}
