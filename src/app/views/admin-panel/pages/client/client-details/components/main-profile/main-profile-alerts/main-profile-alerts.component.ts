import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';

interface Task {
  title: string,
  createdBy: string,  
  description: string,
  dateAdded: string,
  level: string,
  id: any
}

@Component({
  selector: 'client-main-profile-alerts',
  animations: [mainAnimations],
  templateUrl: './main-profile-alerts.component.html',
  styleUrls: ['./main-profile-alerts.component.scss']
})
export class MainProfileAlertsComponent implements OnInit {
  @Input() clientData: any = {};
  public search: string = '';
  
  /*
    Alert level
      1 - Info
      2 - Success
      3 - Warning
      4 - Danger
  */

  public alertList: Task[] = [];
  public dataSource;

  constructor(private router: Router,  ) { }

  ngOnInit(): void {
    this.dataSource = this.clientData?.client_goals ? this.clientData?.client_goals : [];
    //console.log(this.clientData ,"GOALS")
  }

  navigateTo(step){
    sessionStorage.setItem('clientFormStep', `${step}`);
    this.router.navigate([`/admin/clients/edit/${this.clientData?.id}`]);

    /*routerLink="/admin/clients/details/{{clientData?.id}}/goals"*/
  }

  /*
    Client list table filter
  */
  searchDataSource(): void {
    const filteredAlerts = [...this.clientData?.client_goals]
    .filter(el => {
      let transformed = {
        "goal": el.goal,
        "id": el.id,
        "goal_type": el.goal_type, 
        "description": el.description, 
        "status": el.status,
        "duration": el.duration,
      };
      
      return JSON.stringify(transformed).toLowerCase().includes(this.search.toLowerCase());
    });

    this.dataSource = filteredAlerts
  }

  removeAlert(id){
    let index = this.dataSource.findIndex(el => el.id === id);

    this.dataSource.splice(index, 1);
  }

}
