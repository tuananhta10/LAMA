import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { EmployeeBulkEmailActionTypes } from '@main/views/admin-panel/store/actions/admin-employee-bulk-email.action';
import { AdminProfileState } from '@main/views/admin-panel/store/index';
import { select, Store } from '@ngrx/store';
import { Observable, Subscription, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddProfileEmailComponent } from '../../dialogs/add-profile-email/add-profile-email.component';  
import { DeleteArchiveItemComponent } from '../../dialogs/delete-archive-item/delete-archive-item.component';  
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-email-inbox',
  animations: [mainAnimations],
  templateUrl: './profile-email-inbox.component.html',
  styleUrls: ['./profile-email-inbox.component.scss']
})
export class ProfileEmailInboxComponent implements OnInit {
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
  public sampleEmailList: any[] = [
    {
      id: 1,  
      view: false,
      selected: false,
      status: 'inbox',
      from: "Rachel Johnson",  
      email: 'rachel.johnson@gmail.com',
      to: "Mark Mendrez",  
      date_sent: new Date("April 10, 2023"),  
      subject: "Employee Performance Review",  
      content: `As we approach the end of the fiscal year, 
      <br><br>
      it's time for us to conduct your performance review. 
      <br><br>
      Your hard work and dedication to the company have not gone unnoticed, and we are pleased to see the progress you have made in your role.
      <br><br>
      During this review, we will be evaluating your job performance, including your productivity, quality of work, and ability to meet deadlines. We will also discuss your career goals and how we can support your professional development.
      <br><br>
      Please let me know a few dates and times that work for you to schedule the review.
      <br><br>
      Best,`
    },

    {
      id: 2,  
      view: false,
      selected: false,
      status: 'inbox',
      from: "Paul Sunder",  
      email: 'paul.sunder@gmail.com',
      to: "Mark Mendrez",  
      date_sent: new Date(),  
      subject: "Employee Recognition Program",  
      content: `Dear Team,<br><br>
      I am pleased to announce that we will be launching a new employee recognition program to acknowledge and reward the outstanding contributions of our team members.
      <br><br>
      The program will recognize employees for their dedication, hard work, and exceptional performance. Awards will be given out on a quarterly basis and will include gift cards, extra vacation days, and other perks.
      <br><br>
      We want to recognize and reward the individuals who go above and beyond to make our company a success. If you know of someone who deserves recognition, please nominate them by sending an email with their name and a brief explanation of their contributions.
      <br><br>
      Best,
      <br><br>
      [Your Name]
      `
    },

    {
      id: 3,  
      view: false,
      selected: false,
      status: 'inbox',
      from: "Chikky Filley",  
      email: 'chikky.filley@gmail.com',
      to: "Mark Mendrez",  
      date_sent: new Date("April 9, 2023"),  
      subject: "Employee Training Program",  
      content: `Dear [Employee Name],
      <br><br>
      In an effort to ensure that our team is equipped with the knowledge and skills necessary to excel in their roles, we will be launching a new employee training program.
      <br><br>
      The program will include a variety of courses and workshops designed to improve your technical skills and knowledge. We will also be offering soft skills training, such as communication and leadership, to help you develop professionally.
      <br><br>
      We are committed to investing in the development of our employees and are confident that this program will help you reach your full potential.
      <br><br>
      Please let me know if you have any questions or concerns.
      <br><br>
      Best,
      [Your Name]`
    },

    {
      id: 4,  
      view: false,
      selected: false,
      status: 'inbox',
      from: "Rachel Johnson",  
      email: 'rachel.johnson@gmail.com',
      to: "Mark Mendrez",  
      date_sent: new Date(),  
      subject: "Employee Performance Review",  
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },

    {
      id: 5,  
      view: false,
      selected: false,
      status: 'inbox',
      from: "Rachel Johnson",  
      email: 'rachel.johnson@gmail.com',
      to: "Mark Mendrez",  
      date_sent: new Date(),  
      subject: "Employee Performance Review",  
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },

    {
      id: 6,  
      view: false,
      selected: false,
      status: 'sent',
      from: "Mark Mendrez",  
      email: 'mark.mendrez@gmail.com',
      to: "Rachel Johnson",  
      date_sent: new Date(),  
      subject: "Employee Performance Review Details",  
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
  ];  
  
  public emailListSource: any[] = [];
  public filteredEmailList: any[] = [];
  public employeeBulkEmail$: any;
  public searchSource: any;
  public searchBy: any;
  public selectedEmails: any[] = []

  constructor(private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private router: Router,
    private adminEmployee: Store<AdminProfileState>) { }

  ngOnInit(): void {
    if(this.employeeData){
      this.subscribeToEmployeeEmailInbox();
    }
  }

  updateSelected(email){
    let index = this.selectedEmails.findIndex(el => el?.id === email?.id);  

    if(index > -1){
      this.selectedEmails.splice(index, 1);
    }

    else this.selectedEmails.push(email);
  }

  addNewEmail(content: any, action?: string){
    let dialog = this.dialog.open(
      AddProfileEmailComponent,
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

  deleteEmailItem(){
    if(this.selectedEmails?.length > 0){
      let dialog = this.dialog.open(
        DeleteArchiveItemComponent,
        { 
          minWidth: '30vw',
          data: {
            action: 'delete',
            deletedRows: this.selectedEmails,
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

  archiveEmailItem(){
    if(this.selectedEmails?.length > 0){
      let dialog = this.dialog.open(
        DeleteArchiveItemComponent,
        { 
          minWidth: '30vw',
          data: {
            action: 'archive',
            deletedRows: this.selectedEmails,
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

  subscribeToEmployeeEmailInbox(){
    console.log(this.router.url.match('inbox'))

    this.employeeBulkEmail$ = this.adminEmployee.pipe(select(state => state?.employeeBulkEmail));
    
    if(this.router.url.match('inbox')){
      this.sampleEmailList = this.sampleEmailList.filter(el => el.status === 'inbox');  
    }

    else if(this.router.url.match('sent')){
      this.sampleEmailList = this.sampleEmailList.filter(el => el.status === 'sent');  
    }

    else if(this.router.url.match('archive')){
      this.sampleEmailList = this.sampleEmailList.filter(el => el.status === 'archive');  
    }

    this.emailListSource = this.sampleEmailList;  
    this.filteredEmailList = this.sampleEmailList;  

    this.req =  this.employeeBulkEmail$.subscribe((employeeEmail: any) => {
      this.loading = employeeEmail?.pending || employeeEmail?.pendingTemplate;
    });

    this.adminEmployee.dispatch({
      type: EmployeeBulkEmailActionTypes.GET_EMPLOYEE_BULK_EMAIL_NOTIFICATION_LIST,
      payload: this.employeeData?.id
    });
  }

  // date search
  updateDateFilter(){
    const listDataSource = [...this.emailListSource].filter(el => {
        let dateFromCondition = new Date(el[this.dateSource]) >= new Date(this.dateSearch?.dateFrom);
        let dateToCondition = new Date(el[this.dateSource]) <= new Date(this.dateSearch?.dateTo);

        return this.dateSearch?.dateTo ? (dateFromCondition && dateToCondition) : dateFromCondition;
      } 
    );

    this.filteredEmailList = listDataSource;
  }

  // sort emails
  sortFunc(sortBy){
    switch (true){
      case sortBy === 'a-z': {
        this.filteredEmailList = [...this.emailListSource].sort((a,b) => a.from?.toLowerCase()?.localeCompare(b.from?.toLowerCase()));
        break;
      }
      case sortBy === 'z-a': {
        this.filteredEmailList = [...this.emailListSource].sort((a,b) => b.from?.toLowerCase()?.localeCompare(a.from?.toLowerCase()));
        break;
      }

      case sortBy === 'date-up': {
        this.filteredEmailList = [...this.emailListSource].sort((a,b) => {
          let date_a: any = new Date(a.date_sent);
          let date_b: any = new Date(b.date_sent);

          return date_a - date_b;
        });
        break;
      }

      case sortBy === 'date-down': {
        this.filteredEmailList = [...this.emailListSource].sort((a,b) => {
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
    const listDataSource = [...this.emailListSource]
    .filter(el => {
      let source = {
        id: el?.id,  
        view: el?.view,  
        from: el?.from,  
        email: el?.email,  
        to: el?.to,  
        date_sent: new Date(el?.date_sent),  
        subject: el?.subject,  
        content: el?.content,  
      };

      return JSON.stringify(source).toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.filteredEmailList = listDataSource;

    /*this.dataSource.data = listDataSource.slice(0, this.maxRows);
    this.pageNumbers = Math.ceil([...listDataSource].length / this.maxRows);
    this.paginate = Array(this.pageNumbers).fill(0).map((el, i) => i + 1);;
    this.page = 1;*/
  }

  toggleEvent(id){
    let email = this.sampleEmailList.find(el => el?.id === id);  

    email['view'] = !email['view'];
  }

  replaceContent(content){
    return content.replace(/\<br>/gi, '')
  }
}
