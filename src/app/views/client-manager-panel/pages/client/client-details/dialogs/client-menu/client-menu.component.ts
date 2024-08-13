import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface SideMenu {
  id: string;
  title: string;  
  icon: string;  
  routing: string;
  background: string;  
}

@Component({
  selector: 'app-client-menu',
  templateUrl: './client-menu.component.html',
  styleUrls: ['./client-menu.component.scss']
})
export class ClientMenuComponent implements OnInit {
  public clientMenu: SideMenu[] = [
    {
      id: "about-me",
      title: "About Me",
      icon: "/assets/images/icons/client-menu/about-me.png",  
      routing: `/admin/clients/details/${this.data.id}/about-me`,
      background: "#FEF1FC"
    },

    {
      id: "service-history",
      title: "Service History",
      icon: "/assets/images/icons/client-menu/service-history.png",  
      routing: `/admin/clients/details/${this.data.id}/service-history`,
      background: "#EDF1FC"
    },

    {
      id: "individual-intake",
      title: "Individual Intake",
      icon: "/assets/images/icons/client-menu/individual-intake.png",  
      routing: `/admin/clients/details/${this.data.id}/individual-intake`,
      background: "#EDF1FC"
    },

    {
      id: "medical-history",
      title: "Medical History",
      icon: "/assets/images/icons/client-menu/medical-history.png",  
      routing: `/admin/clients/details/${this.data.id}/medical-history`,
      background: "#FCF3EE"
    },

    {
      id: "incidents",
      title: "Accidents / Incidents",
      icon: "/assets/images/icons/client-menu/incidents.png",  
      routing: `/admin/clients/details/${this.data.id}/incidents`,
      background: "#D7F4F8"
    },

    {
      id: "service-templates",
      title: "Service Templates",
      icon: "/assets/images/icons/client-menu/service-templates.png",  
      routing: `/admin/clients/details/${this.data.id}/service-templates`,
      background: "#FEF1FC"
    },

    {
      id: "service-schedule",
      title: "Service Schedule",
      icon: "/assets/images/icons/client-menu/service-schedule.png",  
      routing: `/admin/clients/details/${this.data.id}/service-schedule`,
      background: "#FCF3EE"
    },

    {
      id: "client-funding",
      title: "Client-funding",
      icon: "/assets/images/icons/client-menu/client-funding.png",  
      routing: `/admin/clients/details/${this.data.id}/client-funding`,
      background: "#D7F4F8"
    },
  ];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<ClientMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  
  }

  ngOnInit(): void {
  }
  
  navigateToMenu(menu: SideMenu){
    this.router.navigate([menu?.routing]).then(() => this.dialogRef.close());
  }

}
