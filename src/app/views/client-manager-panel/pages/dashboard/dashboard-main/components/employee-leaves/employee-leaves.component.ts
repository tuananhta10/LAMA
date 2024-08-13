import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'admin-dashboard-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.scss']
})
export class EmployeeLeavesComponent implements OnInit {
  @Input() dashboardData: any;

  constructor() { }

  ngOnInit(): void {
  }

}
