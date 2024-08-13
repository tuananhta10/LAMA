import { Component, OnInit, Input } from '@angular/core';

interface NavChildLink{
  routerLink: string,
  title: string
}

@Component({
  selector: 'employee-details-navigation',
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
        routerLink: `/staff/employees/details/${this.id}/careworker-client`,
        title: 'Current Participants',
      },

      /*{
        routerLink: `/staff/employees/details/${this.id}/service-details`,
        title: 'Service Details',
      },*/

      {
        routerLink: `/staff/employees/details/${this.id}/workdays`,
        title: 'Availability',
      },

      {
        routerLink: `/staff/employees/details/${this.id}/contact-details`,
        title: 'Contact Details',
      },

      {
        routerLink: `/staff/employees/details/${this.id}/related-documents`,
        title: 'Documents',
      },
    ];
  }

  ngAfterViewInit(): void {
    
  }

}
