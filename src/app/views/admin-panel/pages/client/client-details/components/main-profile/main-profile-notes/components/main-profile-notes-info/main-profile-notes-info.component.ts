import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { mainAnimations } from '@app-main-animation';
import moment from 'moment';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main-profile-notes-info',
  templateUrl: './main-profile-notes-info.component.html',
  styleUrls: ['./main-profile-notes-info.component.scss']
})
export class MainProfileNotesInfoComponent implements OnInit {
  @Input() notesList;
  @Input() activeTab: number = 0;

  private unsubscribe$ = new Subject<void>();
  public loggedUser: any = JSON.parse(localStorage.getItem('loggedUserData'));   
  public activeSchedule: any[];


  constructor(private dialog: MatDialog,) { }

  ngOnInit(): void {
    console.log("notes list");
    console.log(this.notesList);
  }

  formatTime(time: any){
    if(!time) return;

    // Check correct time format and split into components
    time = time?.substr(0,5).toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? ' AM' : ' PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  formatDate(timestamp: any){
    let date: any =  moment.unix(timestamp);
    date.utc();
    date = date.format("dddd, DD/MM/yyyy");
    return date;
  }

}
