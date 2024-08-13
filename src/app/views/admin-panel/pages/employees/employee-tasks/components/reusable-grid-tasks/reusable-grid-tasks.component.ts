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
  selector: 'employee-reusable-grid-tasks',
  animations: [mainAnimations],
  templateUrl: './reusable-grid-tasks.component.html',
  styleUrls: ['./reusable-grid-tasks.component.scss']
})
export class ReusableGridTasksComponent implements OnInit {
  @Input() loading: any = {}
  @Input() componentTitle: string = '';
  @Input() listDataSource: any[] = []

  public months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  public dataStatus: any = [];

  constructor() { }

  ngOnInit(): void {
    this.dataStatus = [
      { 
        title: 'To do', 
        title_sub: 'to-do',
        data: [...this.listDataSource].filter((el: any) => el.status === 'To do') 
      },
      { 
        title: 'In Progress', 
        title_sub: 'in-progress',
        data: [...this.listDataSource].filter((el: any) => el.status === 'In progress' || el.status === 'Active') 
      },
      { 
        title: 'Done', 
        title_sub: 'done',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Done')
      },
      { 
        title: 'Archive', 
        title_sub: 'archive',
        data: [...this.listDataSource].filter((el: any) => el.status === 'Archive')
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
