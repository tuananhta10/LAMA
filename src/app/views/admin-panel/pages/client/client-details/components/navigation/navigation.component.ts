import { Component, OnInit, Input } from '@angular/core';

interface NavChildLink{
  routerLink: string,
  title: string
}

@Component({
  selector: 'client-details-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() id: any = '';
  @Input() activeLink: string = 'details';

  public childLinks: NavChildLink[] = [ ];

  constructor() { 
    
  }

  ngOnInit(): void {
    this.childLinks = [
      {
        routerLink: `/admin/clients/details/${this.id}/careworkers`,
        title: 'Support Team',
      },

      {
        routerLink: `/admin/clients/details/${this.id}/medication`,
        title: 'Medical/Health',
      },

      {
        routerLink: `/admin/clients/details/${this.id}/service-details`,
        title: 'Service Details',
      },

      {
        routerLink: `/admin/clients/details/${this.id}/contact-details`,
        title: 'Contact Details',
      },

      {
        routerLink: `/admin/clients/details/${this.id}/related-documents`,
        title: 'Related Documents',
      },
      {
        routerLink: `/admin/clients/details/${this.id}/client-notes`,
        title: 'Participant Notes'
      },
    ];
  }

  ngAfterViewInit(): void {
    
  }

}
