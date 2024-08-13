import { 
  Component, 
  OnInit 
} from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { SidebarService } from '@app-services/admin-panel/sidebar.service';
import { AdminService } from '@app-services/admin-panel/admin.service';
import { Subscription } from 'rxjs';
import { 
  Router, 
  NavigationEnd 
} from '@angular/router';

@Component({
  selector: 'admin-panel-sidebar',
  animations: [mainAnimations],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  private req?: Subscription; 
  
  //currenUser: User;
  public open: any = false;
  public location: string = '';
  public loggedInAdmin: any;

  constructor(private sidebar: SidebarService, 
    private router: Router,
    private adminService: AdminService
    ) {

    router.events.subscribe((routes: any) => {
      this.location = router.url; 

      this.adminService.adminStatus$.subscribe((result: any) => {
        this.loggedInAdmin = result;
      });
    });
  }

  public sidebarExpanded = true;
  public sidebarWidth = '240';
  public linkDisplayed = true;
  public linksDisplayedClients = false;
  public linksDisplayedAccountSettings = false;
  public linksDisplayPlanningSection = false;
  public linksDisplayDashboard = false;

  ngOnInit(): void {
    this.sidebar.dashboardSidebar.subscribe( (state:any) =>{
      if(state === true){
        this.open = true;
        this.sidebarWidth = '240';

        setTimeout( () => {
          if(this.sidebarWidth == '240') this.displayLink();
        }, 300);
      }
      else if(state === false){
        this.sidebarWidth = '75';
        this.open = false;
        this.linkDisplayed = false;
      }
    })
  }


  displayLink(): void{
    this.linkDisplayed = true;

    if(this.location.match('/admin/dashboard')) this.displayDropdown('dashboard');
    else if(this.location.match('/admin/clients')) this.displayDropdown('clients');
    
  }

  // open or close toggle
  openToggle(): void{
    this.open = !this.open;
    this.sidebar.dashboardSidebar.next(this.open);
    this.linksDisplayedClients = false;
    this.linksDisplayedAccountSettings = false;
    this.linksDisplayPlanningSection = false;
    this.linksDisplayDashboard = false;

    if(this.open) sessionStorage.setItem('sidebarState', this.open);
    else sessionStorage.removeItem('sidebarState');
  }

  closeSidebar(link: any): void{
    this.router.navigate([link]);
    //this.sidebar.dashboardSidebar.next(false);
    //sessionStorage.removeItem('sidebarState');
  }

  displayDropdown(item: any): void{
    switch(item){
      case 'dashboard': {
        this.linksDisplayDashboard = !this.linksDisplayDashboard;
        this.linksDisplayedClients = false;
        this.linksDisplayPlanningSection = false;
        this.linksDisplayedAccountSettings = false;
        break;
      }

      case 'clients': {
        this.linksDisplayedClients = !this.linksDisplayedClients;
        this.linksDisplayedAccountSettings = false;
        this.linksDisplayPlanningSection = false;
        this.linksDisplayDashboard = false;
        break;
      }

      case 'accounts': {
        this.linksDisplayedAccountSettings = !this.linksDisplayedAccountSettings;
        this.linksDisplayedClients = false;
        this.linksDisplayPlanningSection = false;
        this.linksDisplayDashboard = false;
        break;
      }

      case 'planning': {
        this.linksDisplayPlanningSection = !this.linksDisplayPlanningSection;
        this.linksDisplayedClients = false;
        this.linksDisplayedAccountSettings = false;
        this.linksDisplayDashboard = false;
        break;
      }
    }

    this.openSidebar();
  }

  openSidebar(): void{
    if(!this.open) {
      this.open = true;
      this.sidebar.dashboardSidebar.next(this.open);
    }
  }


  adminLogout(): void {
    this.req = this.adminService.logoutAdmin()
    .subscribe(() => {
      window.scrollTo(0, 0);
    });
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }
}
