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
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExcelDownloaderService } from '@app-services/excel/excel-downloader.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-sync-to-xero-dialog',
  templateUrl: './sync-to-xero-dialog.component.html',
  styleUrls: ['./sync-to-xero-dialog.component.scss']
})
export class SyncToXeroDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<SyncToXeroDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private snackBar: MatSnackBar,
    private excelService: ExcelDownloaderService,
    private adminIncident: Store<AdminProfileState>,
    private formBuilder: FormBuilder
  ) { 
    console.log(data)
  }

  ngOnInit(): void {
  }

  syncNow(){
    this.dialogRef.close({
      data: this.data
    })
  }

}
