import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { shortifyAmount } from '@main/shared/utils/short-amount-convert.util';

@Component({
  selector: 'admin-dashboard-statistic-data',
  animations: [mainAnimations],
  templateUrl: './statistic-data.component.html',
  styleUrls: ['./statistic-data.component.scss']
})
export class StatisticDataComponent implements OnInit {
  @Input() loading: boolean = true;  
  @Input() dashboardData: any;

  public shortifyAmount: any = shortifyAmount;

  constructor() { }

  ngOnInit(): void {
  }

}
