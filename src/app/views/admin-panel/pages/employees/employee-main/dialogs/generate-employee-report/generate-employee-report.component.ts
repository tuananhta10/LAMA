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
import { FilterByEmployeeComponent } from '../filter-by-employee/filter-by-employee.component';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { columns, selectedColumns } from '../../utils/employee-report-model-interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { format } from 'date-fns';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { SelectGroupGlobalComponent } from '@main/shared/components/select-group-global/select-group-global.component';
import { EmployeeListService } from '@app-services/admin-panel/employee-list.service';

@Component({
  selector: 'app-generate-employee-report',
  templateUrl: './generate-employee-report.component.html',
  styleUrls: ['./generate-employee-report.component.scss']
})
export class GenerateEmployeeReportComponent implements OnInit {
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();
  public optionGroup!: FormGroup;
  public displayedColumns: any[] = columns;
  public selectedColumns: any[] = selectedColumns;
  public radioOptions:any[] = [{id: true, name: "Yes", value: true}, {id: false, name:"No", value: false}];
  public loading: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<GenerateEmployeeReportComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private employeeService: EmployeeListService,
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
    this.data?.employees?.forEach((el, i) => {
      // test to insert inside
      if(i % 2 === 0) 
        this.insertToArr(i, [], this.data?.employees);
    });

    this.optionGroup = this.formBuilder.group({
      include_compliance: [false],
    });
  }

  ngOnDestroy(){
    if(this.req) this.req.unsubscribe();
  }

  generateReport(){
    if(this.optionGroup.controls['include_compliance'].value === true){
      this.loading = true;
      this.generateReportCompliance();
    }

    else this.generateReportNoCompliance();
  }

  public generatedData: any[] = [];
  public generatedColumn: any[] = [];
  public employeePosition: any[] = [];
  public filteredEmployeePosition: any[] = [];

  generateReportNoCompliance(){
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
    let data = [...this.data?.employees].map((el) => modifyObject(el));
    let columns = this.displayedColumns.filter(el => this.selectedColumns.indexOf(el.col_name) > -1).map(el => el.title);
    
    this.generatedData = data;
    this.generatedColumn = columns;
    this.employeePosition = [...new Set(data.map((el: any) => el['Position']))];
    this.filteredEmployeePosition = [...this.employeePosition];
  }

  
  public compliancePosition: any[] = []

  generateReportCompliance(){
    this.req = this.employeeService.getEmployeeListCompliance()
    .subscribe((result:any) => {
      this.loading = false;
      let employee = result?.map(el => {
        let qualification = {};  

        el?.employee_qualification?.forEach(_el => {
          qualification[`${_el?.qualification[0]?.qualification}`] = {
            status: _el?.status,  
            type: _el?.qualification[0]?.type,
            expiry_date: !!_el?.expiry_date ? format(new Date(_el?.expiry_date * 1000), 'EEE, dd-MM-yyyy') : "-"
          }
        });

        let columns = Object.keys(qualification).map((key) => key);

        return {
          full_name: `${el.first_name} ${el.last_name}`,
          job_type: el?.job_type,  
          employment_type: el?.employment_type,  
          position: el?.employee_position_display_name, // employee position here
          ...qualification,
          columns: ["Full Name", "Job Type", "Employment Type", ...columns]
        }
      });

      this.compliancePosition = [];

      // generate position grouping
      employee.forEach((el) => {
        let obj = {
          position: el?.position,  
          columns: el?.columns
        }

        let index = this.compliancePosition.findIndex(_el => JSON.stringify(_el) === JSON.stringify(obj));

        if(index === -1) 
          this.compliancePosition.push(obj)
      });

      this.generatedData = employee;
    })
  }

  stringifyData(data){
    return JSON.stringify(data)
  }

  public downloading: boolean = false;

  getCanvasElement(id: string){
    let columnGroup = [];
    
    this.compliancePosition.forEach(el => {
      el?.columns?.forEach(_el => {
        let index = columnGroup.indexOf(_el);  

        if(index === -1) 
          columnGroup.push(_el.trim());

        console.log(index)
      })
    });

    let group = this.optionGroup.controls['include_compliance'].value === true ? [...columnGroup]/*this.compliancePosition.map(el => el.position)*/ : [/*...this.filteredEmployeePosition, */...this.generatedColumn];
    console.log(group, this.compliancePosition)


    this.dialogRef.close();
    this.excelService.exportAsExcelHtmlCompliance(id, "Employee Compliance Report - " + format(new Date(), 'EEE, dd/MM/yyyy'), group);
    this.snackBar.open(`Your file is being downloaded. Please wait...`, '', {
      duration: 4000,
      panelClass: 'success-snackbar'
    });
  }

  filterEmployee(data){
    let openFilterChecklist = this.dialog.open(
      SelectGroupGlobalComponent,
      { 
          minWidth: '300px',
          maxWidth: '420px',
          data: {
            groupBy: "Position",
            data: data
          },

        }
      );

      openFilterChecklist
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result?.filteredList?.length > 0){
          this.filteredEmployeePosition = result?.filteredList;
          this.loading = true;  
          setTimeout(() => this.loading = false, 1000);
        }
      });
  }

}
