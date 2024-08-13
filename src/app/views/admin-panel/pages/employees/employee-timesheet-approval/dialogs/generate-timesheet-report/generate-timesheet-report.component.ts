import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { IncidentActionTypes } from '@main/views/admin-panel/store/actions/admin-incident.action';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { FilterByEmployeeComponent } from '../filter-by-employee/filter-by-employee.component';
import { columns, selectedColumns } from '../../utils/timesheet-approval-report-model-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { format } from 'date-fns';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-generate-timesheet-report',
  templateUrl: './generate-timesheet-report.component.html',
  styleUrls: ['./generate-timesheet-report.component.scss']
})
export class GenerateTimesheetReportComponent implements OnInit {
  private unsubscribe$ = new Subject<void>();
  public displayedColumns: any[] = columns;
  public selectedColumns: any[] = selectedColumns;
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<GenerateTimesheetReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private excelService: ExcelDownloaderService,
    private adminIncident: Store<AdminProfileState>,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { 
    console.log(data)
  }

  public test = {
    id: 1, 
    name: 'test'
  }

  insertToArr( index, items, arr ) {
    return arr.splice( index, 0, ...items );
  };

  ngOnInit(): void {
  }

  public generatedData: any[] = [];
  public generatedColumn: any[] = [];
  public employees: any[] = [];
  public filteredEmployee: any[] = [];

  generateReport(){
    /* Find index  */
    const index = (item) => this.selectedColumns.indexOf(item); 
    /* Find title from columns */
    const findTitle = (col_name: any) => this.displayedColumns.find((el) => el.col_name === col_name);
    /* Sort columns by keys */
    const sortedKeys = (el) => Object.getOwnPropertyNames(el).sort((a,b) => this.selectedColumns.indexOf(a) - this.selectedColumns.indexOf(b));
    
    /* Remove hidden columns from search */
    const modifyObject = (el: any) => {
      const sorted = sortedKeys(el);
      const result = {};

      sorted.forEach((item, _i) => {
        if(item === 'first_name') 
          result['full_name'] = `${el['first_name']} ${el['last_name']}`;
        
        else if(index(item) !== -1 && item !== 'first_name' && !item.match('date')) {
          result[findTitle(item)?.title] = el[item];
        }

        else if(item?.match('date')){
          if(el[item] && findTitle(item)?.title)
            result[findTitle(item)?.title] = format(new Date(el[item] * 1000), 'EEEE, dd-MM-yyyy');
        }
      });

      return result;
    }

    /* OPTION FOR EXPORTING DATA */
    let data = [...this.data?.timesheet].map((el) => modifyObject(el));
    let columns = this.displayedColumns.filter(el => this.selectedColumns.indexOf(el.col_name) > -1).map(el => el.title);
    
    this.generatedData = data;
    this.generatedColumn = columns;
    this.employees = [...new Set(data.map((el: any) => el['Employee Name']))];
    this.filteredEmployee = [...this.employees];
  }

  public downloading: boolean = false;

  getCanvasElement(id: string){
    this.dialogRef.close();
    this.excelService.exportAsExcelHtml(id, "Timesheet Report - " + format(new Date(), 'EEE, dd-MM-yyyy'), this.filteredEmployee);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }

  filterEmployee(data){
    let openFilterChecklist = this.dialog.open(
      FilterByEmployeeComponent,
      { 
          minWidth: '300px',
          maxWidth: '420px',
          data: data
        }
      );

      openFilterChecklist
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.filteredList?.length > 0){
          this.filteredEmployee = result?.filteredList;
          this.loading = true;  
          setTimeout(() => this.loading = false, 1000);
        }
      });
  }
  
}
