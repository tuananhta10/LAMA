import { 
  Component, 
  OnInit, 
  Input 
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';


@Component({
  selector: 'admin-employee-list-feed',
  animations: [mainAnimations],
  templateUrl: './employee-list-feed.component.html',
  styleUrls: ['./employee-list-feed.component.scss']
})
export class EmployeeListFeedComponent implements OnInit {

  @Input() loading: boolean = true;
  @Input() liveFeeds: any[] = [];

  public defaultImage: string = '/assets/images/icons/user-placeholder.png';

  constructor() { }

  ngOnInit(): void {
  }

}
