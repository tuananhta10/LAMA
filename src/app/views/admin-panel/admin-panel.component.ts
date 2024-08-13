import { Component, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { 
  Router, 
  ActivatedRoute 
} from '@angular/router';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-admin-panel',
  animations: [mainAnimations],
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  public location: string = '';
  public loading: boolean = true;
  
  constructor(private router:Router, 
    private activatedRoute: ActivatedRoute,) { 
    this.router.events.subscribe((event: any) => {
      //setTimeout(() => this.loading = true, 500);
      //setTimeout(() => this.loading = false, 1000);
      this.location = router.url; 
    });
  }

  ngOnInit(): void {
    //setTimeout(() => this.loading = false, 1000);
  }

}
