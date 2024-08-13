import { 
  Component, 
  OnInit, 
  Input 
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';


@Component({
  selector: 'admin-client-list-feed',
  animations: [mainAnimations],
  templateUrl: './client-list-feed.component.html',
  styleUrls: ['./client-list-feed.component.scss']
})
export class ClientListFeedComponent implements OnInit {
  @Input() loading: boolean = true;
  @Input() liveFeeds: any[] = [];

  public defaultImage: string = '/assets/images/icons/user-placeholder.png';

  constructor() { }

  ngOnInit(): void {
  }

}
