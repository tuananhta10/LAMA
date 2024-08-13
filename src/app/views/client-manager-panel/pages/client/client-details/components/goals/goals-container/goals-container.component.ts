import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'client-goals-container',
  templateUrl: './goals-container.component.html',
  styleUrls: ['./goals-container.component.scss']
})
export class GoalsContainerComponent implements OnInit {
  @Input() goalData: any = {};
  constructor() { }

  ngOnInit(): void {
  }

}
