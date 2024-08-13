import { Component, Input, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-employee-banner',
  animations: [mainAnimations],
  templateUrl: './employee-banner.component.html',
  styleUrls: ['./employee-banner.component.scss']
})
export class EmployeeBannerComponent implements OnInit {
  @Input() label: string = '';
  
  constructor() { }

  ngOnInit(): void {
    
  }

}
