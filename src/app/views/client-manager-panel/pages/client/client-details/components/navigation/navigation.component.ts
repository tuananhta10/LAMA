import { Component, OnInit, Input } from '@angular/core';

interface NavChildLink{
  routerLink: string,
  title: string,
  access: any[]
}

@Component({
  selector: 'client-details-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() id: any = '';
  @Input() activeLink: string = 'details';
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  public childLinks: NavChildLink[] = [ ];

  constructor() { 
    
  }

  ngOnInit(): void {
    this.childLinks = [
      {
        routerLink: `/staff/clients/details/${this.id}/careworkers`,
        title: 'Support Workers',
        access: ["Admin", "Scheduler"]
      },

      {
        routerLink: `/staff/clients/details/${this.id}/medication`,
        title: 'Medication',
        access: ["Admin", "Scheduler", "Service Facilitator", "Support Coordinator", "Support Worker"]
      },

      {
        routerLink: `/staff/clients/details/${this.id}/service-details`,
        title: 'Service Details',
        access: ['Admin']
      },

      {
        routerLink: `/staff/clients/details/${this.id}/contact-details`,
        title: 'Contact Details',
        access: ["Admin", "Scheduler", "Service Facilitator", "Support Coordinator", "Support Worker"]
      },

      {
        routerLink: `/staff/clients/details/${this.id}/related-documents`,
        title: 'Related Documents',
        access: ["Admin", "Scheduler", "Service Facilitator", "Support Coordinator", "Support Worker"]
      },
      {
        routerLink: `/admin/clients/details/${this.id}/client-notes`,
        title: 'Participant Notes',
        access: ["Admin", "Scheduler", "Service Facilitator", "Support Coordinator", "Support Worker"]
      },
    ];
  }

  ngAfterViewInit(): void {
    
  }

  checkAccess(access: any){
    let ret = false;
    if(Array.isArray(access)){
      ret = access.includes(this.loggedUser.system_role);
    }
    return ret;
  }

}
