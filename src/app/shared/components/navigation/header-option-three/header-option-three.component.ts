import { Component, 
  OnInit, 
  OnDestroy 
} from '@angular/core';
import { 
  Router, 
  ActivatedRoute 
} from '@angular/router';
import { AdminService } from '@app-services/admin-panel/admin.service';
import { mainAnimations } from '@app-main-animation';
import { Subscription } from 'rxjs';
import {  
  Navigation,
  SubMenu,
  HelpFaqs,
  AdminAccess,
  HelpFaqsMenu
} from '../utils/client-manager-menu-model';

@Component({
  selector: 'app-header-option-three',
  animations: [mainAnimations],
  templateUrl: './header-option-three.component.html',
  styleUrls: ['./header-option-three.component.scss']
})
export class HeaderOptionThreeComponent implements OnInit {

  private req?: Subscription;
  private routeReq?: Subscription;
  public search: string = '';
  public searchGlobal: string = '';
  public loggedInAdmin: any;
  public location: string = '';
  public access: any = [];

  public adminAccess: Navigation[] = AdminAccess;
  public helpFaqsDefault: HelpFaqs[] = HelpFaqsMenu;
  public helpFaqs: HelpFaqs[] = this.helpFaqsDefault;
  public adminName: string = '';
  public searchBy: string = '';
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));
  
  constructor(private router:Router, 
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService) { 
    this.routeReq = this.router.events.subscribe((event: any) => {
      this.location = this.router.url; 
      //console.log(router.url)

      this.routeReq.add(
        this.adminService.adminStatus$.subscribe((result: any) => {
          this.loggedInAdmin = result;

          if(result){
            window.scrollTo({ top: 0, left: 0, behavior: 'smooth'});
            let name = JSON.parse(localStorage.getItem('loggedUserData'));
            this.loggedUser = JSON.parse(localStorage.getItem('loggedUserData'));
            this.access = this.adminAccess;
            this.adminName = `${name?.first_name} ${name?.last_name}`;
          }
        })
      )
    });
  }

  ngOnInit(): void  {
  
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }

  navigateToLink(submenus, link){
    if(submenus.length === 0) this.router.navigate([link])
  }

  adminLogout(): void {
    localStorage.clear();
    localStorage.removeItem('selected_client_columns');
    window.location.href = "/signin";
    //this.adminService.logoutAdmin();
    //this.router.navigate(['/signin'])
  }

  searchDataSource(): void {
    const helpFaqs = [...this.helpFaqsDefault]
    .filter(el => {
      let transformed = {
        "title": el.title,
        "description": el.description,
      };
      
      return JSON.stringify(transformed).toLowerCase().includes(this.search.toLowerCase());
    });

    this.helpFaqs = helpFaqs;
  }

  globalSearchRoute(): void{
    this.router.navigate(['/staff/dashboard'])
      .then(() => {
        localStorage.setItem('searchLinks', this.searchGlobal);  
        this.searchGlobal = null;
        this.router.navigate(['/staff/global-search']);
      });
  }

  searchLink(): void {

  }

  navigateToEmployeePortal(){
    location.href = '/staff/clients';
  }

  navigateToProfile(){
    this.router.navigate([`/staff/employees/details/` + this.loggedUser.id]);
  }

  checkAccess(access: any){
    let ret = false;
    if(Array.isArray(access)){
      ret = access.includes(this.loggedUser.system_role);
    }
    return ret;
  }

}
