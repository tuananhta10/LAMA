import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateClientGoalModalComponent } from '../../dialogs/create-client-goal/create-client-goal-modal.component';

interface Goals {
  type: string,
  name: string,
  due: string,
  width: number,
  progressBG: string,
  status: string,
  startDate: string,
  endDate: string,  
  description: string,  
  goalClient: string,  
  dateAchieved: string,  
  achievementComments: string,  
  clientFamilyResponsibility: string,
  organizationResponsibility: string,
  otherStakeHolderResponsibility: string,
}

interface Tasks{
  name: string,  
  due: string
}

@Component({
  selector: 'app-goals',
  animations: [mainAnimations],
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {
  public goals: Goals[] = [
    {
      type: "No Progress",
      name: "Objective Sample",  
      due: "March 23",  
      width: 40,
      progressBG: "success",
      status: "Active",
      startDate: "Jan 1, 2021",
      endDate: "March 23, 2021",  
      description: "Sample Description",  
      goalClient: "Sample Client",  
      dateAchieved: "",  
      achievementComments: "",  
      clientFamilyResponsibility: "",
      organizationResponsibility: "",
      otherStakeHolderResponsibility: "",
    },

    {
      type: "Current Goals",
      name: "Objective Sample",  
      due: "March 23",  
      width: 30,
      progressBG: "warning",
      status: "Active",
      startDate: "Jan 1, 2021",
      endDate: "March 23, 2021",  
      description: "Sample Description",  
      goalClient: "Sample Client",  
      dateAchieved: "",  
      achievementComments: "",  
      clientFamilyResponsibility: "",
      organizationResponsibility: "",
      otherStakeHolderResponsibility: "",
    },

    {
      type: "Partial Goals",
      name: "Objective Sample",  
      due: "March 23",  
      width: 80,
      progressBG: "warning",
      status: "Active",
      startDate: "Jan 1, 2021",
      endDate: "March 23, 2021",  
      description: "Sample Description",  
      goalClient: "Sample Client",  
      dateAchieved: "",  
      achievementComments: "",  
      clientFamilyResponsibility: "",
      organizationResponsibility: "",
      otherStakeHolderResponsibility: "",
    },

    {
      type: "Goal achieved at target level",
      name: "Objective Sample",  
      due: "March 23",  
      width: 50,
      progressBG: "danger",
      status: "Active",
      startDate: "Jan 1, 2021",
      endDate: "March 23, 2021",  
      description: "Sample Description",  
      goalClient: "Sample Client",  
      dateAchieved: "",  
      achievementComments: "",  
      clientFamilyResponsibility: "",
      organizationResponsibility: "",
      otherStakeHolderResponsibility: "",
    },

    {
      type: "Goal achieved beyond target",
      name: "Objective Sample",  
      due: "March 23",  
      width: 70,
      progressBG: "warning",
      status: "Active",
      startDate: "Jan 1, 2021",
      endDate: "March 23, 2021",  
      description: "Sample Description",  
      goalClient: "Sample Client",  
      dateAchieved: "",  
      achievementComments: "",  
      clientFamilyResponsibility: "",
      organizationResponsibility: "",
      otherStakeHolderResponsibility: "",
    },

    {
      type: "N/A",
      name: "Objective Sample",  
      due: "March 23",  
      width: 50,
      progressBG: "warning",
      status: "Active",
      startDate: "Jan 1, 2021",
      endDate: "March 23, 2021",  
      description: "Sample Description",  
      goalClient: "Sample Client",  
      dateAchieved: "",  
      achievementComments: "",  
      clientFamilyResponsibility: "",
      organizationResponsibility: "",
      otherStakeHolderResponsibility: "",
    },
  ];

  public tasks: Tasks[] = [
    {
      name: "Task Sample",  
      due: "March 23"
    },

    {
      name: "Task Sample",  
      due: "March 23"
    },

    {
      name: "Task Sample",  
      due: "March 23"
    },

    {
      name: "Task Sample",  
      due: "March 23"
    },
  ]

  private unsubscribe$ = new Subject<void>();
  public loading: boolean = true;

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    setTimeout(() => this.loading = false, 1000);
  }

  openCreateClientGoalModal(){
    let createClientDialog = this.dialog.open(
      CreateClientGoalModalComponent,
      { 
        width: '40vw',
        data: {
        },
      }
    );

    createClientDialog
    .afterClosed()
    .pipe(takeUntil(this.unsubscribe$))
    .subscribe(result => {

    });
  }


}
