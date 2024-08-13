import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';
import { mainAnimations } from '@app-main-animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ClientNotesModalComponent } from '../../modals/client-notes/client-notes-modal.component';
import { MedicationModalComponent } from '../../modals/medications-modal/medication-modal.component';
import { HealthCareProvidersModalComponent } from '../../modals/health-care-providers-modal/health-care-providers-modal.component';
import { ClientConstants } from '../../../constants';
import { DatePipe } from '@angular/common';
import { convertTimestampUtc } from '@main/shared/utils/date-convert.util';
import { Location } from '@angular/common';
import { DeleteRecordComponent } from '@main/views/admin-panel/pages/administration/dialogs/delete-record/delete-record.component';

@Component({
  selector: 'app-medication-client-notes',
  animations: [mainAnimations],
  templateUrl: './medication-client-notes.component.html',
  styleUrls: ['./medication-client-notes.component.scss']
})
export class MedicationClientNotesComponent implements OnInit {
  isLinear = false;
  private unsubscribe$ = new Subject<void>();

  medicationForm!: FormGroup;
  medicationColumns: any[] = [{name: 'Name', field: 'name'}, {name: 'Dose', field: 'dose'}, {name: 'Administer/Prompt', field: 'administer'}, {name: 'Time to Take medication', field: 'medication_time'}, ];
  medicationData:any[] = [];
  editMedicationData:any = {
    add: [],
    update: [],
    delete:[]
  }

  clientNotesColumns: any[] = [{name: 'Participant', field: 'client_name'}, {name: 'Note Date', field: 'note_date'}, {name: 'Title', field: 'title'}, {name: 'Created By', field: 'name'},
  {name: 'Role', field: 'role'}, {name: 'Created On', field: 'date_added'}, {name: 'Entry Date', field: 'date_added'}]
  clientNotesData: any[] = [];
  editClientNotesData: any = {
    add: [],
    update: [],
    delete:[]
  }

  healthCareColumn: any[] = [{name: 'Name/Doctor', field: 'name'}, {name: 'Clinic Name', field: 'clinic'}, {name: 'Phone Number', field: 'phone_no'}, {name: 'Reason', field: 'reason'}, ];
  healthCareData: any[] = [];
  edithealthCareData: any = {
    add: [],
    update: [],
    delete:[]
  }

  @Input() navigation: any = {};
  @Input() currentStatus: string = '';
  @Output() updateStepper: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @ViewChild(MatMenuTrigger) menuTrigger: MatMenuTrigger;
  @Input() medicationClientNotes: any;
  @Input() isUpdate: boolean = false;
  private toBeUpdated: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private location: Location, 
    private datePipe : DatePipe) { }

  ngOnInit(): void {
    this.formStep.emit(ClientConstants.medicationClientNotes);

    this.medicationForm = this.formBuilder.group({
      allergies: [this.medicationClientNotes ? this.medicationClientNotes["allergies"] : null],
      other_medical_social_history: [this.medicationClientNotes ? this.medicationClientNotes["other_medical_social_history"] : null],
      meal_time_management: [this.medicationClientNotes ? this.medicationClientNotes["meal_time_management"] : null],
    });

    // AUTO SAVE
    this.subscribeAutoSave();

    if(this.medicationClientNotes) {
      console.log(this.medicationClientNotes);

      /* for medication table */
      this.medicationData = this.medicationClientNotes['client_medication'] ? this.medicationClientNotes['client_medication'] : [];
      this.medicationData?.forEach((el, i) => {
        el['medication_time'] = this.convertTo12Hrs(el['medication_time']);
      });

      this.clientNotesData = this.medicationClientNotes['client_notes'] ? this.medicationClientNotes['client_notes'] : [];
      this.clientNotesData?.forEach((el, i) => {
        console.log(el)
        el['client_name'] = el?.client[0]?.name;
      });

      this.healthCareData = this.medicationClientNotes['client_health_care_provider'] ? this.medicationClientNotes['client_health_care_provider'] : [];
    }
  }

  subscribeAutoSave(){
    /* VALUE CHANGE */
    this.medicationForm.valueChanges.subscribe((change: any) => {
      let currentFormValues = change//JSON.stringify();
      let previousValue = {
        allergies: this.medicationClientNotes?.allergies,
        other_medical_social_history: this.medicationClientNotes?.other_medical_social_history,
        meal_time_management: this.medicationClientNotes?.meal_time_management,
      }

      if(JSON.stringify(currentFormValues) !== JSON.stringify(previousValue)){
        this.toBeUpdated = true;
        console.log(currentFormValues, previousValue, `THERE'S A CHANGE WITH THE FORMS`)
      }
    });
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

  next(){
    if(this.medicationForm.valid){
      this.submitData.emit(this.medicationForm.value)
      this.updateStepper.emit(this.isUpdate ? this.navigation?.next - 1 : this.navigation?.next);
    }
  }

  skip(){
    this.updateStepper.emit(this.navigation?.next - 1);
  }

  back(){
    if(sessionStorage.getItem('clientFormStep')){
      this.location.back();
    }

    else this.updateStepper.emit(this.isUpdate ? this.navigation?.previous - 1 : this.navigation?.previous);
  }

  convertToDateTime(dateVal: Date){
    let date = this.datePipe.transform(dateVal, 'yyyy-MM-dd');
    date = date + "T00:00:00";
    return date;
  }


  public submitting: boolean = false;

  submit(){
    let data = {
      //"id": this.medicationClientNotes?.id,
      ...this.medicationForm.value,
      "client-health-care-provider": {
        ...this.edithealthCareData
      },
      "client-medication": {
        ...this.editMedicationData
      },
      "client-notes": {
        
        ...this.editClientNotesData,
      }
    }
    this.submitData.emit(data);
    this.submitting = true;
  }

  // Medication Modal
  openMedicationModal(event){
    // create
    if(!event){
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
        if(result){
          this.editMedicationData.add.push(result);
          this.medicationData.push(result);
          this.submit();
        }
      });
    }

    // Update
    else {
      let medicationDialog = this.dialog.open(
        MedicationModalComponent,
        {
          panelClass: "dialog-responsive",
          width: '450px',
          data: {
            data: event,
            client_id: this.medicationClientNotes?.id
          },
        }
      );

      medicationDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          let data = {
            id: event?.id,  
            ...result
          }
          this.editMedicationData.update.push(data);
          this.submit();
        }
      });
    }
  }
  

  // Client Notes Modal
  openClientNotesModal(event){
    if(!event){
      let clientNotesDialog = this.dialog.open(
        ClientNotesModalComponent,
        {
          panelClass: "dialog-responsive",
          width: '45vw',
          //height: '720px',
          data: {
            client_id: this.medicationClientNotes?.id,
            role: JSON.parse(localStorage.getItem('loggedUserData')),
            created_by: JSON.parse(localStorage.getItem('loggedUserData'))
          },
        }
      );

      clientNotesDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          console.log(result)

          result.note_date = convertTimestampUtc(result?.note_date);
          result.entry_date = convertTimestampUtc(result?.entry_date);

          this.editClientNotesData.add.push(result);
          this.clientNotesData.push(result);
          this.submit();
        }
      });
    }

    else {
      let clientNotesDialog = this.dialog.open(
        ClientNotesModalComponent,
        {
          panelClass: "dialog-responsive",
          width: '45vw',
          //height: '720px',
          data: {
            data: event,
            client_id: this.medicationClientNotes?.id,
            created_by: JSON.parse(localStorage.getItem('loggedUserData'))
          },
        }
      );

      clientNotesDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          let data = {
            id: event?.id,
            ...result
          }
          data.note_date = convertTimestampUtc(result?.note_date);
          data.entry_date = convertTimestampUtc(result?.entry_date);
          data.date_added = convertTimestampUtc(result?.date_added);

          this.editClientNotesData.update.push(data);
          this.submit();
        }
      });
    }
  }

  // Health Provider Modal
  openHealthProviderModal(event){
    if(!event){
      let healthProviderDialog = this.dialog.open(
        HealthCareProvidersModalComponent,
        {
          panelClass: "dialog-responsive",
          width: '35vw',
          //height: '720px',
          data: {
            client_id: this.medicationClientNotes?.id,
          },
        }
      );

      healthProviderDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          this.edithealthCareData.add.push(result);
          this.healthCareData.push(result);
          this.submit();
        }
      });
    }

    else {
      let healthProviderDialog = this.dialog.open(
        HealthCareProvidersModalComponent,
        {
          panelClass: "dialog-responsive",
          width: '35vw',
          //height: '720px',
          data: {
            client_id: this.medicationClientNotes?.id,
            data: event
          },
        }
      );

      healthProviderDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if(result){
          let data = {
            id: event?.id,  
            ...result
          }
          this.edithealthCareData.update.push(data);
          this.submit();
        }
      });
    }
  }

  deleteMedicationRow(index){  
    let deleteDialog = this.dialog.open(
      DeleteRecordComponent,
      {
        minWidth: '30vw',
        data: index,
      }
    );

    deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          this.editMedicationData.delete.push(this.medicationData[index]);
          this.medicationData.splice(index, 1)

          this.submit();
        }
      });
  }

  deleteClientRow(index){
    let deleteDialog = this.dialog.open(
      DeleteRecordComponent,
      {
        minWidth: '30vw',
        data: index,
      }
    );

    deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          this.editClientNotesData.delete.push(this.clientNotesData[index]);
          this.clientNotesData.splice(index, 1);

          this.submit();
        }
      });
  }

  deleteHealthProviderRow(index){
    let deleteDialog = this.dialog.open(
      DeleteRecordComponent,
      {
        minWidth: '30vw',
        data: index,
      }
    );

    deleteDialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {
        if (!result.cancel) {
          this.edithealthCareData.delete.push(this.healthCareData[index]);
          this.healthCareData.splice(index, 1)

          this.submit();
        }
      });
  }

  openMenu() {
    this.menuTrigger.openMenu();
  }

  @Output() saveClientAsDraft: EventEmitter<any> = new EventEmitter<any>();

  saveAsDraft(){
    this.submitData.emit(this.medicationForm.value);
    this.saveClientAsDraft.emit(true);
  }

  ngOnDestroy(): void {
    // AUTO SAVE
    if(this.toBeUpdated && !this.submitting){
      let data = {
        //"id": this.medicationClientNotes?.id,
        ...this.medicationForm.value,
        "client-health-care-provider": {
          ...this.edithealthCareData
        },
        "client-medication": {
          ...this.editMedicationData
        },
        "client-notes": {
          
          ...this.editClientNotesData,
        }
      }
      this.submitData.emit(data);
    }
  }
}
