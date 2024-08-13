import { 
  Component, 
  OnInit 
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-error-page',
  animations: [mainAnimations],
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
