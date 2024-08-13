import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { 
  Subscription, 
  Observable, 
  forkJoin, 
  combineLatest 
} from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { 
  select, 
  Store 
} from '@ngrx/store';

import { 
  displayedColumns,
  TableHeader,
  CommunicationTemplate,
  selectedColumns,
  templateList 
} from '../../utils/communication-template-model-interface';
import { AddCommunicationTemplateComponent } from '../../dialogs/add-communication-template/add-communication-template.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-communication-template',
  animations: [mainAnimations],
  templateUrl: './communication-template.component.html',
  styleUrls: ['./communication-template.component.scss']
})
export class CommunicationTemplateComponent implements OnInit {
  private req: Subscription;
  private unsubscribe$ = new Subject<void>();


  public routerUrl: any[] = [];
  public loading: boolean = true;
  public id;
  public displayedColumns: TableHeader[] = displayedColumns;
  public templateList: CommunicationTemplate[] = []//templateList;
  public selectedColumns: string[] = selectedColumns;
  public listView: boolean = true;
  public searchSource: any = (el) => {
    return {
      id: el.id, 
      type: el.type,   
      name: el.name,  
      profile_image: el.profile_image,
    }
  } 

  constructor(private router: Router,
    private dialog: MatDialog,
    private route: ActivatedRoute) {
    this.id = route.parent.snapshot.params['id'];
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false;

      }, 1000);
  }

  ngOnDestroy(): void {
    if(this.req) this.req.unsubscribe();
  }


  openAddTemplate(){
    let addTemplateDialog = this.dialog.open(
      AddCommunicationTemplateComponent,
      { 
        minWidth: '30vw',
        maxWidth: '55vw',
        data: {
        },
      }
    );

    addTemplateDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }


}
