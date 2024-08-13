import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  dashboardSidebar = new BehaviorSubject<boolean>(true);

  constructor() { 
    sessionStorage.removeItem('sidebarState');
    
    //if(window.innerWidth >= 1024) this.companySidebarState.next(true);
  }
}
