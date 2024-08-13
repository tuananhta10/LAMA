import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { mainAnimations } from '@app-main-animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientNotesModalComponent } from '../../modals/client-notes/client-notes-modal.component';
import { MedicationModalComponent } from '../../modals/medications-modal/medication-modal.component';

import { ClientConstants } from '../../../constants';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-medication-client-notes',
  animations: [mainAnimations],
  templateUrl: './medication-client-notes.component.html',
  styleUrls: ['./medication-client-notes.component.scss']
})
export class MedicationClientNotesComponent implements OnInit {
  isLinear = false;
  private unsubscribe$ = new Subject<void>();

  medicationColumns: any[] = [{name: 'Name', field: 'name'}, {name: 'Dose', field: 'dose'}, {name: 'Administer/Prompt', field: 'administer'}, {name: 'Time to Take medication', field: 'medication_time'}, ];
  medicationData:any[] = [];
  editMedicationData:any = {
    add: [],
    delete:[]
  }


  clientNotesColumns: any[] = [{name: 'Client', field: 'client'}, {name: 'Note Date', field: 'noteDate'}, {name: 'Title', field: 'title'}, {name: 'Created By', field: 'createdBy'},
  {name: 'Role', field: 'role'}, {name: 'Created On', field: 'date_added'}, {name: 'Entry Date', field: 'date_added'}]
  clientNotesData: any[] = [];
  editClientNotesData: any = {
    add: [],
    delete:[]
  }

  @Input() navigation: any = {};
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @Input() medicationClientNotes: any;
  
  constructor(
    public dialog: MatDialog,
    private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.formStep.emit(ClientConstants.medicationClientNotes);

    if(this.medicationClientNotes) {
      console.log(this.medicationClientNotes);

      this.medicationData = this.medicationClientNotes['client_medication'] ? this.medicationClientNotes['client_medication'] : [];
      
      this.medicationData?.forEach((el, i) => {
        el['medication_time'] = this.convertTo12Hrs(el['medication_time']);
      });

      this.clientNotesData = this.medicationClientNotes['client_notes'] ? this.medicationClientNotes['client_notes'] : []
    }
  }

  convertTo12Hrs(time) {
    // Check correct time format and split into components
    time = time?.substr(0,5).toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next);
  }

  back(){
    this.updateStepper.emit(this.navigation?.previous);
  }

  convertToDateTime(dateVal: Date){
    let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;
  }

  submit(){
    let data = {
      //"id": this.medicationClientNotes?.id,
      "client-medication": {
        ...this.editMedicationData
      },
      "client-notes": {
        
        ...this.editClientNotesData,
      }
    }
    this.submitData.emit(data)
  }


  openMedicationModal(e){
    let medicationDialog = this.dialog.open(
      MedicationModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '450px',
        data: {
          client_id: this.medicationClientNotes?.id
        },
      }
    );

    medicationDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      console.log(result);
      this.editMedicationData.add.push(result);
      this.medicationData.push(result);
    });
  }
  

  openClientNotesModal(e){
    let clientNotesDialog = this.dialog.open(
      ClientNotesModalComponent,
      {
        panelClass: "dialog-responsive",
        width: '45vw',
        //height: '720px',
        data: {
          client_id: this.medicationClientNotes?.id,
          createdBy: JSON.parse(localStorage.getItem('loggedUserData'))
        },
      }
    );

    clientNotesDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {
      result.noteDate = this.convertToDateTime(result?.noteDate);
      this.editClientNotesData.add.push(result);
      this.clientNotesData.push(result);
    });
  }

  deleteMedicationRow(index){
    this.editMedicationData.delete.push(this.medicationData[index]);
    this.medicationData.splice(index, 1)
  }

  deleteClientRow(index){
    this.editClientNotesData.delete.push(this.clientNotesData[index]);
    this.clientNotesData.splice(index, 1);
  }

  openMenu() {
    this.menuTrigger.openMenu();
  }
}
