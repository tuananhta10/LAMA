import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { 
  select, 
  Store 
} from '@ngrx/store';
import { ClientListActionTypes } from '@app-admin-store/actions/admin-clients.action';
import { ClientListState  } from '@app-admin-store/reducers/admin-clients.reducer';
import { ClientActionTypes } from '@main/views/admin-panel/store/actions/admin-client.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';

@Component({
  selector: 'client-details-medication',
  animations: [mainAnimations],
  templateUrl: './medication.component.html',
  styleUrls: ['./medication.component.scss']
})
export class MedicationComponent implements OnInit {
  private clientsData$: any;
  private req: Subscription;
  private client$: any;
  public clientData: any = {};
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;

  public medicationColumns: any[] = [
    { title: 'Name', col_name: 'name'}, 
    { title: '', col_name: 'extra_space'}, 
    { title: 'Dose', col_name: 'dose'},
    { title: 'Administer/Prompt', col_name: 'administer'},
    { title: 'Time to Take medication', col_name: 'medication_time'},
  ];

  public medicationColumnsCol: any[] = this.medicationColumns.map(el => el.col_name);
  public medicationColumnsList: any[] = [];

  public clientNotesColumns: any[] = [
    {title: 'Client', col_name: 'name'}, 
    {title: 'Note Date', col_name: 'note_date'}, 
    {title: 'Title', col_name: 'title'}, 
    {title: 'Content', col_name: 'content'},
    {title: 'Role', col_name: 'role'}, 
    {title: 'Created On', col_name: 'date_added'}
  ];

  public healthCareColumn: any[] = [
    {title: 'Name/Doctor', col_name: 'name'}, 
    {title: 'Clinic Name', col_name: 'clinic'}, 
    {title: 'Phone Number', col_name: 'phone_no'}, 
    {title: 'Reason', col_name: 'reason'}, 
  ];
  public healthCareColumnCol: any[] = this.healthCareColumn.map(el => el.col_name);
  public healthCareData: any[] = [];

  public clientNotesColumnsCol: any[] = this.clientNotesColumns.map(el => el.col_name);
  public clientNotesColumnsList: any[] = [];
  public filteredClientNotes: any[] = [];
  public filteredHealthCareData: any[] = [];
  public filteredMedication: any[] = [];
  public searchBy: string = '';
  
  constructor(private clientListStore: Store<ClientListState>,
    private clientStore: Store<AdminProfileState>,
    private router: Router,
    private route: ActivatedRoute) {
    this.clientsData$ = this.clientListStore.pipe(select(state => state));
    this.client$ = this.clientStore.pipe(select(state => state.client));
    this.id = route.parent.snapshot.params['id'];

    console.log(this.id)
  }

  ngOnInit(): void {
    this.getClientDetails();
    
    if(this.id){
      this.subscribeClient();
      this.getClient();
    }
  }

  navigateToClientEdit(){
    sessionStorage.setItem('clientFormStep', '5');
    this.router.navigate([`/admin/clients/edit/${this.clientData?.id}`]);
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  // client details
  getClientDetails(): void{
    // Subscribe to storage
    this.req = this.clientsData$.subscribe((results: any) => {
      if(results){
        this.clientData = results?.clients.clientList.find(el => el?.id == this.id);
      }
    });
  }

  subscribeClient(){
    let client = this.client$;
    this.req = client.subscribe((results: any) => {
      console.log("MEDICATION", results?.client)
      this.loading = results?.pending;

      if(results?.client?.medicationClientNotes?.client_medication?.length > 0){
        this.medicationColumnsList = results?.client?.medicationClientNotes?.client_medication;
        this.medicationColumnsList?.forEach((el, i) => {
          el['medication_time'] = this.convertTo12Hrs(el['medication_time']);
        });

        this.filteredMedication = [...this.medicationColumnsList];
      }

      if(results?.client?.medicationClientNotes?.client_notes?.length > 0){
        this.clientNotesColumnsList = results?.client?.medicationClientNotes?.client_notes;

        this.clientNotesColumnsList.forEach((el) => {
          el['name'] = `${results?.client?.medicationClientNotes?.name}`
        });

        this.filteredClientNotes = [...this.clientNotesColumnsList];
      }

      if(results?.client?.medicationClientNotes?.client_health_care_provider?.length > 0){
        this.healthCareData = results?.client?.medicationClientNotes?.client_health_care_provider;
        this.filteredHealthCareData = [...this.healthCareData];
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

  getClient(){
    let clientType = {
      type: 'medications-and-client-notes',
      id: this.id,
      key: 'medicationClientNotes'
    }
    this.clientStore.dispatch({
      type: ClientActionTypes.GET_CLIENT,
      payload: clientType
    });
  }

  /*
    Client list table filter
  */
  searchDataSource(searchList: any[], source): any[] {
    const listDataSource = [...searchList]
    .filter(el => {
      let objectSource = source(el);

      return JSON.stringify(objectSource).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    console.log(listDataSource)

    return listDataSource;
  }

  multipleSearch(): void {
    let clientNotesObj = (el) => {
      return {
        id: el.id, 
        client: el.client,  
        noteDate: el.noteDate,
        title: el.title,  
        createdBy: el.createdBy,  
        role: el.role,  
        date_added: el.date_added 
      }
    } 

    this.filteredClientNotes = this.searchDataSource([...this.clientNotesColumnsList], clientNotesObj);

    let medicationObj = (el) => {
      return {
        name: el.name, 
        dose: el.dose
      }
    } 

    this.filteredMedication = this.searchDataSource([...this.medicationColumnsList], medicationObj);


    this.loading = true;
    setTimeout(() => this.loading = false, 1000)
  }
}
