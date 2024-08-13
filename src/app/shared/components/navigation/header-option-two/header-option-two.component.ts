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
} from '../utils/menus-model';

@Component({
  selector: 'app-header-option-two',
  animations: [mainAnimations],
  templateUrl: './header-option-two.component.html',
  styleUrls: ['./header-option-two.component.scss']
})
export class HeaderOptionTwoComponent implements OnInit {

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
  public initials: string = 'LM';
  public navbarSize: number = 0;  

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
            this.initials = `${name?.first_name.substr(0,1)}${name?.last_name.substr(0,1)}`

            let nav =  document.getElementById('navbar-brand');  

            if(nav)
              this.navbarSize = nav.clientWidth;
          }
        })
      )
    });
  }


  ngOnInit(): void  {
    setTimeout(() => {
      let nav =  document.getElementById('navbar-brand');  

      if(nav)
        this.navbarSize = nav.clientWidth;
    }, 300)

    console.log(this.loggedUser)
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
    sessionStorage.clear();
    window.location.href = "/signin";
    //this.adminService.logoutAdmin();
    //this.router.navigate(['/signin'])
  }

  searchDataSource(): void {
    const helpFaqs = [...this.helpFaqsDefault]
    .filter(el => {
      let transformed = {
        "question": el.question,
        "answer": el.answer,
      };
      
      return JSON.stringify(transformed).toLowerCase().includes(this.search.toLowerCase());
    });

    this.helpFaqs = helpFaqs;
  }

  globalSearchRoute(): void{
    this.router.navigate(['/admin/dashboard'])
      .then(() => {
        localStorage.setItem('searchLinks', this.searchGlobal);  
        this.searchGlobal = null;
        this.router.navigate(['/admin/global-search']);
      });
  }

  searchLink(): void {

  }

  navigateToEmployeePortal(){
    location.href = '/staff/clients';
  }

  navigateToProfile(){
    if(this.loggedUser?.system_role && this.loggedUser?.role_title !== 'Lama Admin'){
      this.router.navigate([`/admin/employees/details/${this.loggedUser?.id}`]);
    }
  }

  navigateToURL(route:string, type:string){
    if(type !== 'email'){
      window.open(route, '_blank')
    }else{
      window.location.href = `mailto:${route}?subject=Support`
    }
  }
}
