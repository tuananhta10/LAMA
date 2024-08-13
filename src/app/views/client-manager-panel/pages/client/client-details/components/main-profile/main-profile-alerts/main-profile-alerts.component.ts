import { Component, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';

interface Alert {
  title: string,
  createdBy?: string,  
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

  public alertList: Alert[] = [
    {
      id: 1001,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "warning"
    },

    {
      id: 1002,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "info"
    },

    {
      id: 1003,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "success"
    },

    {
      id: 1001,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "danger"
    },

    {
      id: 1004,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "warning"
    },

    {
      id: 1005,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "info"
    },

    {
      id: 1006,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "success"
    },

    {
      id: 1007,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "danger"
    },

    {
      id: 1008,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "warning"
    },

    {
      id: 1009,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "info"
    },

    {
      id: 1010,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "success"
    },

    {
      id: 1011,
      title: "Tasks Title",
      createdBy: "",  
      description: "Ut ipsum justo, malesuada a enim vitae, malesuada",
      dateAdded: "06-Apr-2021",
      level: "danger"
    },
  ];

  public dataSource: Alert[] = this.alertList;

  constructor() { }

  ngOnInit(): void {
  }

  /*
    Client list table filter
  */
  searchDataSource(): void {
    const filteredAlerts = [...this.alertList]
    .filter(el => {
      let transformed = {
        "title": el.title,
        "id": el.id,
        "createdBy": el.createdBy, 
        "description": el.description, 
        "level": el.level
        
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
