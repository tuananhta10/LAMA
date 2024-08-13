import { Component, OnInit } from '@angular/core';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-administration-main',
  animations: [mainAnimations],
  templateUrl: './administration-main.component.html',
  styleUrls: ['./administration-main.component.scss']
})
export class AdministrationMainComponent implements OnInit {

  public loading: boolean = true;
  constructor() { }

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 1000);
  }

}
