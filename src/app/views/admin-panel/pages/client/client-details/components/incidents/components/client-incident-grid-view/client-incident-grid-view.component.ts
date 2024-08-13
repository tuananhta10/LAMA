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
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-client-incident-grid-view',
  animations: [mainAnimations],
  templateUrl: './client-incident-grid-view.component.html',
  styleUrls: ['./client-incident-grid-view.component.scss']
})


export class ClientIncidentGridViewComponent implements OnInit {
  @Input() loading: any = {}
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = []

  public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public dataStatus: any = [];

  constructor() { }

  ngOnInit(): void {
    this.dataStatus = [
      { 
        title: 'Open', 
        title_sub: 'open',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Open') 
      },
      { 
        title: 'Resolved', 
        title_sub: 'resolved',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Resolved') 
      },
      { 
        title: 'Undecided', 
        title_sub: 'undecided',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Undecided')
      },
      { 
        title: 'Withdrawn', 
        title_sub: 'withdrawn',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Withdrawn')
      },

      { 
        title: 'Referred', 
        title_sub: 'referred',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Referred')
      },

      { 
        title: 'No Action Required', 
        title_sub: 'no-action-required',
        data: [...this.listDataSource].filter((el: any) => el.status === 'No Action Required')
      },
    ];
  }

  randomize(){
    return Math.floor(Math.random() * 16) + 1
  }

  
  convertDate(dateString: any){
    const convertedDate = new Date(dateString);

    return `${this.months[convertedDate.getMonth()]} ${convertedDate.getDay()}`;
  }
}
