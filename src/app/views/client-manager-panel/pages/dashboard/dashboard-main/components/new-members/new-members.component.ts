import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard-new-members',
  templateUrl: './new-members.component.html',
  styleUrls: ['./new-members.component.scss']
})
export class NewMembersComponent implements OnInit {
  public defaultImage: string = '/assets/images/icons/user-placeholder.png';
  public searchBy: string = '';
  
  constructor() { }

  ngOnInit(): void {
  }

  /*
      list table filter
    */
  searchNews(): void {
    /*const searchClient = [...this.scheduleBoardListClient].filter(el => {
      return JSON.stringify(el.client)
        .toLowerCase()
        .includes(this.searchBy.toLowerCase());
    });
  */
    
  }

  downloadDocument(type){
    if(type === 'Manual'){
      window.open('/assets/documents/manual.pdf', '_blank');
    }
  }

}
