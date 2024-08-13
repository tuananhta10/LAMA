import { 
  Component,
  OnInit, 
  Input 
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'global-admin-loader',
  animations: [mainAnimations],
  templateUrl: './global-admin-loader.component.html',
  styleUrls: ['./global-admin-loader.component.scss']
})
export class GlobalAdminLoaderComponent implements OnInit {

  @Input() loading: boolean = true;
  @Input() withSideBar: boolean = false;
  @Input() fromDetailTab: boolean = false;
  @Input() formOnly: boolean = false;
  @Input() tableOnly: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
