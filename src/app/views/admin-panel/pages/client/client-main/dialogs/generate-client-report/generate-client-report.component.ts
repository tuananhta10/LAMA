import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatStepper } from '@angular/material/stepper';
import { StepModel } from '@main/shared/components/stepper/model';
import { select, Store } from '@ngrx/store';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { IncidentActionTypes } from '@main/views/admin-panel/store/actions/admin-incident.action';
import { Subscription } from 'rxjs';
import { EmployeeListActionTypes } from '@main/views/admin-panel/store/actions/admin-employees.actions';
import { ClientListActionTypes } from '@main/views/admin-panel/store/actions/admin-clients.action';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { columns, selectedColumns } from '../../utils/client-report-model-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-generate-client-report',
  templateUrl: './generate-client-report.component.html',
  styleUrls: ['./generate-client-report.component.scss']
})
export class GenerateClientReportComponent implements OnInit {

  public displayedColumns: any[] = columns;
  public selectedColumns: any[] = selectedColumns;

  constructor(
    public dialogRef: MatDialogRef<GenerateClientReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private excelService: ExcelDownloaderService,
    private adminIncident: Store<AdminProfileState>,
    private formBuilder: FormBuilder
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
  public grouping: any[] = [];
  public filteredGrouping: any[] = [];
  public loading: boolean = false;
  public downloading: boolean = false;

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
        if(index(item) !== -1) {
          result[findTitle(item)?.title] = el[item];
        }
      });

      return result;
    }

    /* OPTION FOR EXPORTING DATA */
    let data = [...this.data?.clients].map((el) => modifyObject(el));
    let columns = this.displayedColumns.filter(el => this.selectedColumns.indexOf(el.col_name) > -1).map(el => el.title);
    
    this.generatedData = data;
    this.generatedColumn = columns;
    this.grouping = [...new Set(data.map((el: any) => el['Position']))];
    this.filteredGrouping = [...this.grouping];

    //this.getCanvasElement('participant-report-template');
  }

  getCanvasElement(id: string){
    this.dialogRef.close();
    this.excelService.exportAsExcelHtml(id, "Participant Report - " + format(new Date(), 'EEE, dd-mm-yyyy'), this.generatedColumn);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }
}
