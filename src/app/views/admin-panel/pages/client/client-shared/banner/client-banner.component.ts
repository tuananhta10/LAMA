import { Component, Input, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-client-banner',
  animations: [mainAnimations],
  templateUrl: './client-banner.component.html',
  styleUrls: ['./client-banner.component.scss']
})
export class ClientBannerComponent implements OnInit {
  @Input() label: string = '';
  @Input() title: string = 'Create';
  @Input() clientName: string = '';
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
