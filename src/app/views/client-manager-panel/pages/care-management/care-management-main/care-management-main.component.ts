import { Component, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-care-management-main',
  animations: [mainAnimations],
  templateUrl: './care-management-main.component.html',
  styleUrls: ['./care-management-main.component.scss']
})
export class CareManagementMainComponent implements OnInit {

  public loading: boolean = true;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 1000);
  }


}
