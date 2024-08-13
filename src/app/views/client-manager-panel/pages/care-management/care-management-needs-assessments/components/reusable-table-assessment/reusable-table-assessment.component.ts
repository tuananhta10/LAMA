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

@Component({
  selector: 'care-reusable-table-assessment',
  animations: [mainAnimations],
  templateUrl: './reusable-table-assessment.component.html',
  styleUrls: ['./reusable-table-assessment.component.scss']
})
export class ReusableTableAssessmentComponent implements OnInit {

  @Input() loading: boolean = true;
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = [];
  @Input() withHeader: boolean = true;
  @Input() searchSource: any;

  // column and table controls
  @Input() tableController: any = {};
  @Input() displayedColumns: any[] = [];
  @Input() selectedColumns: string[] = [];
  @Input() selectedColumnsMobile: string[] = [];
  @Input() tableNumber: number = 0;

  @Output() updateSelectedRows: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteSelectedRow: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateSelectedRowDialog: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatSort) sort: MatSort;
  @Input() maxRows: number = 5;

  // for filtering
  public searchBy: string = '';
  public dataSource = new MatTableDataSource<any>(this.listDataSource);
  public selectedRows: any[] = [];

  // pagination option 
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
    this.dataSource.data = [...this.listDataSource].slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...this.listDataSource].length / this.maxRows);
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
    Client list table filter
  */
  searchDataSource(searchBy: any = this.searchSource): void {
    const listDataSource = [...this.listDataSource]
    .filter(el => {
      return JSON.stringify(searchBy(el))
      .toLowerCase()
      .includes(this.searchBy.toLowerCase());
    });

    this.dataSource.data = listDataSource.slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);;
    this.page = 1;

    console.log(listDataSource, this.searchBy)
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
    
    else 
      this.selectedRows = [...this.selectedRows, row];     

    // update selected rows from parent
    this.updateSelectedRows.emit({
      tableNumber: this.tableNumber,
      selectedRows: this.selectedRows
    }); 
  }

  /* 
    View client details
    @params 
      - row : Client List row
      - id : Client id
  */
  viewDetails(row: any, id: number): void{
    console.log("NAVIGATE", row?.id)
    /*this.router.navigate([`/admin/clients/details/${row?.id}`])*/
    this.openDialog('details', row)
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
      
  }

  /* View Detail Dialog
  */
  viewDetailDialog(row): void{
    const selectedClient = [...this.listDataSource].find(el => el.id === row?.id);


    // open edit column dialog
    /*const dialogRef = this.dialog.open(ClientListSimpleDetailDialogComponent, {
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

    console.log(selectedClient)*/
  }

}
