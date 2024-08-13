import { 
  Component,
  OnInit, 
  Input 
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'admin-profile-loader',
  animations: [mainAnimations],
  templateUrl: './admin-profile-loader.component.html',
  styleUrls: ['./admin-profile-loader.component.scss']
})
export class AdminProfileLoaderComponent implements OnInit {

  @Input() loading: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
