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
  @Input() supportWorkerMetrics: any;  
  @Input() IncidentMetrics: any;  
  @Input() fundingMetrics: any;
  @Input() screenWidth: number = 0;

  public openIncident: any;

  public shortifyAmount: any = shortifyAmount;

  constructor() { }

  ngOnInit(): void {
    /*const groupedData = this.IncidentMetrics.reduce((acc, obj) => {
      const { status } = obj;

      // Check if the status exists as a key in the accumulator
      if (!acc[status]) {
        // If it doesn't exist, create a new array with the current object
        acc[status] = [obj];
      } else {
        // If it exists, push the current object to the existing array
        acc[status].push(obj);
      }

      return acc;
    }, {});*/

    console.log(this.IncidentMetrics)
  }

  getOpenIncident(){
    return this.IncidentMetrics?.open?.split('/')[0]
  }

  roundPercent(num): number{
    return Math.round(num * 100) / 100;
  }

  //shortifyAmount(any, number){ return any }
}
