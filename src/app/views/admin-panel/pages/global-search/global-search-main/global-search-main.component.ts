import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';

import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { global_search_object } from '../utils/search-dictionary-model-interface';

@Component({
  selector: 'app-global-search-main',
  animations: [mainAnimations],
  templateUrl: './global-search-main.component.html',
  styleUrls: ['./global-search-main.component.scss']
})
export class GlobalSearchMainComponent implements OnInit, OnDestroy {
  public search: string = localStorage.getItem('searchLinks') || '';
  private req: Subscription;
  public routerUrl: any[] = [];
  public loading: boolean = true;
  public searchObject: any = global_search_object;
  public id;

  constructor(private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;

      if(this.search.trim() && this.search != 'null'){
        const searchBy = [...this.searchObject].filter(el => {
          if(el) return JSON.stringify(el).toLowerCase().includes(this.search.toLowerCase());
        });

        this.searchObject = searchBy;
      }

      else this.searchObject = [...global_search_object];

    }, 1500);
  }

  sortBy(sort: string): void {
    if(sort === 'a-z'){
      this.searchObject = [...this.searchObject]
      .sort((a,b) => {
        if(a.name < b.name) { return -1; }
        if(a.name > b.name) { return 1; }
        return 0;
      });
    }

    else {
      this.searchObject = [...this.searchObject]
      .sort((a,b) => {
        if(a.name < b.name) { return 1; }
        if(a.name > b.name) { return -1; }
        return 0;
      });
    }
  }


  ngOnDestroy(){
    localStorage.removeItem('searchLinks');
  }

}
