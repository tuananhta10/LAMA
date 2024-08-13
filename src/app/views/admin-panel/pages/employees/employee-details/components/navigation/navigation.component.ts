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
        routerLink: `/admin/employees/details/${this.id}/careworker-client`,
        title: 'Participants',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/service-details`,
        title: 'Employment',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/workdays`,
        title: 'Availability',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/contact-details`,
        title: 'Contact Details',
      },

      {
        routerLink: `/admin/employees/details/${this.id}/related-documents`,
        title: 'Documents',
      },
    ];
  }

  ngAfterViewInit(): void {
    
  }

}
