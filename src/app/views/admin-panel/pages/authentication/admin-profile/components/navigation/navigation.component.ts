import { Component, OnInit, Input } from '@angular/core';

interface NavChildLink{
  routerLink: string,
  title: string
}
@Component({
  selector: 'admin-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  @Input() activeLink: string = 'details';

  public childLinks: NavChildLink[] = [ ];

  constructor() { 
    
  }

  ngOnInit(): void {
    this.childLinks = [
      {
        routerLink: `/admin/profile`,
        title: 'General',
      },

      {
        routerLink: `/admin/jobs`,
        title: 'Jobs',
      },

      {
        routerLink: `/admin/payroll`,
        title: 'Payroll',
      },

      {
        routerLink: `/admin/documents`,
        title: 'Documents',
      },

      {
        routerLink: `/admin/dependents`,
        title: 'Dependents',
      },
    ];
  }

  ngAfterViewInit(): void {
    
  }


}
