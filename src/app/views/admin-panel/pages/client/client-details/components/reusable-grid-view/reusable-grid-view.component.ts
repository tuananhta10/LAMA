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
  selector: 'client-reusable-grid-view',
  animations: [mainAnimations],
  templateUrl: './reusable-grid-view.component.html',
  styleUrls: ['./reusable-grid-view.component.scss']
})
export class ReusableGridViewComponent implements OnInit {
  @Input() loading: any = {}
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = []

  public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public dataStatus: any = [];

  constructor() { }

  ngOnInit(): void {
    this.dataStatus = [
      { 
        title: 'Completed', 
        title_sub: 'completed',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Completed') 
      },
      { 
        title: 'In Progress', 
        title_sub: 'in-progress',
        data: [...this.listDataSource].filter((el: any) => el.status === 'In Progress' || el.status === 'Active') 
      },
      { 
        title: 'Planned', 
        title_sub: 'planned',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Planned')
      },
      { 
        title: 'Expired', 
        title_sub: 'expired',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Expired')
      },
    ];
  }

  
  convertDate(dateString: any){
    const convertedDate = new Date(dateString);
    return `${this.months[convertedDate.getMonth() - 1]} ${convertedDate.getDay()}`;
  }

}
