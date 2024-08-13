import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { EmployeeBulkSMSActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-bulk-sms.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProfileSmsComponent } from '../../dialogs/add-profile-sms/add-profile-sms.component';  
import { DeleteArchiveItemComponent } from '../../dialogs/delete-archive-item/delete-archive-item.component';  
import { MatDialog } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-sms-inbox',
  animations: [mainAnimations],
  templateUrl: './profile-sms-inbox.component.html',
  styleUrls: ['./profile-sms-inbox.component.scss']
})
export class ProfileSmsInboxComponent implements OnInit {
  @Input() employeeData: any;
  @Input() loading: boolean = true;
  
  /* DATE FILTER */
  @ViewChild('dateFrom') dateFrom;
  @ViewChild('dateTo') dateTo;
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();

  public dateSource: any = 'date_sent';
  public dateSearch: any = {
    dateFrom: '',  
    dateEnd: ''
  }
  public toggle : boolean = false;
  public showDateFilter: boolean = true;
  public sampleSMSList: any[] = [
    {
      id: 6,
      view: false,
      from: "John Smith",
      phone_number: this.generateRandomPhoneNumber(),
      to: "Mark Mendrez",
      date_sent: new Date(),
      subject: "Employee Recognition Program",
      content: "Congratulations to our team member, Sarah Johnson, for receiving employee of the month for her outstanding contributions to the company. Keep up the great work!"
    },

    {
      id: 7,
      view: false,
      from: "Jane Doe",
      phone_number: this.generateRandomPhoneNumber(),
      to: "Mark Mendrez",
      date_sent: new Date(),
      subject: "New Employee Training Program",
      content: "We are excited to announce a new training program for new hires. The program will cover company policies and procedures, as well as provide hands-on training for specific job duties. We believe this will ensure a smooth transition for new team members and set them up for success."
    },

    {
      id: 8,
      view: false,
      from: "Bob Smith",
      phone_number: this.generateRandomPhoneNumber(),
      to: "Mark Mendrez",
      date_sent: new Date(),
      subject: "Employee Survey",
      content: "We value your feedback and would like to hear your thoughts on how we can improve as a company. Please take a few minutes to complete the employee survey that was sent to your sms. Your input is greatly appreciated and will help us make positive changes."
    },

    {
      id: 9,
      view: false,
      from: "Emily Davis",
      phone_number: this.generateRandomPhoneNumber(),
      to: "Mark Mendrez",
      date_sent: new Date("March 1, 2023"),
      subject: "Company Outing",
      content: "We are excited to announce a company outing to the local amusement park next month. This is a great opportunity for team members to bond and have fun outside of the office. We will be sending out more information and a sign-up sheet in the coming weeks, so keep an eye out for those."
    },

    {
      id: 10,
      view: false,
      from: "John Doe",
      phone_number: this.generateRandomPhoneNumber(),
      to: "Mark Mendrez",
      date_sent: new Date(),
      subject: "Benefits Enrollment Reminder",
      content: "This is a reminder that benefits enrollment for the upcoming year is now open. Please log in to the employee portal by the deadline to enroll or make changes to your current coverage. If you have any questions, please reach out to HR for assistance."
    },

    {
      id: 11,
      view: false,
      from: "Samantha Johnson",
      phone_number: this.generateRandomPhoneNumber(),
      to: "Mark Mendrez",
      date_sent: new Date("April 8, 2023"),
      subject: "Safety Training",
      content: "As part of our ongoing commitment to safety in the workplace, we will be conducting safety training for all employees next week. The training will cover important topics such as fire safety, emergency procedures, and proper use of equipment. Please make sure to attend the training session scheduled for your department."
    },

    {
      id: 12,  
      view: false,
      from: "John Smith",  
      phone_number: '555-555-5555',
      to: "Jane Doe",  
      date_sent: new Date("April 4, 2023"),  
      subject: "New Employee Orientation",  
      content: "Welcome to our company, Jane! We are excited to have you join our team. To help you get acclimated to our company, we will be holding a new employee orientation on Monday, June 1st at 10am. During the orientation, you will meet members of our team and learn about our company's culture, policies, and procedures. We will also provide you with necessary tools and resources."
    },

  ];  

  public checkedSMS: any[] = [];
  public smsListSource: any[] = [];
  public filteredSMSList: any[] = [];
  public employeeBulkSMS$: any;
  public searchSource: any;
  public searchBy: any;

  constructor(private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private adminEmployee: Store<AdminProfileState>) { }

  ngOnInit(): void {
    console.log(this.employeeData)
    if(this.employeeData?.id){
      this.subscribeToEmployeeSMSInbox();
    }
  }

  updateCheckbox(sms: any){
    let index = this.checkedSMS.findIndex(el => el === sms); 

    if(index === -1) this.checkedSMS.push(sms);  
    else this.checkedSMS.splice(index, 1);


    console.log(this.checkedSMS) 
  }

  addNewSms(content: any, action?: string){
    let dialog = this.dialog.open(
      AddProfileSmsComponent,
      { 
        minWidth: '85vw',
        data: {
          action: action,
          content: content,
          employee: this.employeeData
        }
      }
    );

    dialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }

  deleteSMSItem(){
    if(this.checkedSMS?.length > 0){
      let dialog = this.dialog.open(
        DeleteArchiveItemComponent,
        { 
          minWidth: '30vw',
          data: {
            action: 'delete',
            deletedRows: this.checkedSMS,
            employee: this.employeeData
          }
        }
      );

      dialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });
    }
  }

  archiveSMSItem(){
    if(this.checkedSMS?.length > 0){
      let dialog = this.dialog.open(
        DeleteArchiveItemComponent,
        { 
          minWidth: '30vw',
          data: {
            action: 'archive',
            deletedRows: this.checkedSMS,
            employee: this.employeeData
          }
        }
      );

      dialog
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(result => {

      });
    }
  }

  subscribeToEmployeeSMSInbox(){
    this.employeeBulkSMS$ = this.adminEmployee.pipe(select(state => state?.employeeBulkSMS));
    this.smsListSource = this.sampleSMSList;  
    this.filteredSMSList = this.sampleSMSList;  

    this.req =  this.employeeBulkSMS$.subscribe((employeeSMS: any) => {
      this.loading = employeeSMS?.pending || employeeSMS?.pendingTemplate;
    });

    console.log(this.employeeData?.id)

    this.adminEmployee.dispatch({
      type: EmployeeBulkSMSActionTypes.GET_EMPLOYEE_BULK_SMS_NOTIFICATION_LIST,
      payload: this.employeeData?.id
    });
  }

  // date search
  updateDateFilter(){
    const listDataSource = [...this.smsListSource].filter(el => {
        let dateFromCondition = new Date(el[this.dateSource]) >= new Date(this.dateSearch?.dateFrom);
        let dateToCondition = new Date(el[this.dateSource]) <= new Date(this.dateSearch?.dateTo);

        return this.dateSearch?.dateTo ? (dateFromCondition && dateToCondition) : dateFromCondition;
      } 
    );

    this.filteredSMSList = listDataSource;
  }

  // sort smss
  sortFunc(sortBy){
    switch (true){
      case sortBy === 'a-z': {
        this.filteredSMSList = [...this.smsListSource].sort((a,b) => a.from?.toLowerCase()?.localeCompare(b.from?.toLowerCase()));
        break;
      }
      case sortBy === 'z-a': {
        this.filteredSMSList = [...this.smsListSource].sort((a,b) => b.from?.toLowerCase()?.localeCompare(a.from?.toLowerCase()));
        break;
      }

      case sortBy === 'date-up': {
        this.filteredSMSList = [...this.smsListSource].sort((a,b) => {
          let date_a: any = new Date(a.date_sent);
          let date_b: any = new Date(b.date_sent);

          return date_a - date_b;
        });
        break;
      }

      case sortBy === 'date-down': {
        this.filteredSMSList = [...this.smsListSource].sort((a,b) => {
          let date_a: any = new Date(a.date_sent);
          let date_b: any = new Date(b.date_sent);
          
          return date_b - date_a;
        });
        break;
      }
    }
  }

  // search function
  searchDataSource(): void {
    const listDataSource = [...this.smsListSource]
    .filter(el => {
      let source = {
        id: el?.id,  
        view: el?.view,  
        from: el?.from,  
        sms: el?.sms,  
        to: el?.to,  
        date_sent: new Date(el?.date_sent),  
        subject: el?.subject,  
        content: el?.content,  
      };

      return JSON.stringify(source).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.filteredSMSList = listDataSource;

    /*this.dataSource.data = listDataSource.slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);;
    this.page = 1;*/
  }

  toggleEvent(id){
    let sms = this.sampleSMSList.find(el => el?.id === id);  

    sms['view'] = !sms['view'];
  }

  generateRandomPhoneNumber() {
    const firstThree = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const secondThree = Math.floor(Math.random() * (999 - 100 + 1) + 100);
    const lastFour = Math.floor(Math.random() * (9999 - 1000 + 1) + 1000);
    return `${firstThree}-${secondThree}-${lastFour}`;
  }



  replaceContent(content){
    return content.replace(/\<br>/gi, '')
  }
}
