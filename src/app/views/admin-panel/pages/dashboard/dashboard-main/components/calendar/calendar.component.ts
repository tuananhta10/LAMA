import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {
  public selected: Date | null;

  constructor() { }

  ngOnInit(): void {
  }

}
