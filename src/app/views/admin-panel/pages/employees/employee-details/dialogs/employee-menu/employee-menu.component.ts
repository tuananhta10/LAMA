import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

interface SideMenu {
  id: string;
  title: string;  
  icon: string;  
  background: string; 
  routing: string; 
}

@Component({
  selector: 'app-employee-menu',
  templateUrl: './employee-menu.component.html',
  styleUrls: ['./employee-menu.component.scss']
})
export class EmployeeMenuComponent implements OnInit {

  public employeeMenu: SideMenu[] = [
    /*{
      id: "training",
      title: "Training",
      icon: "/assets/images/icons/employee-menu/training.png",  
      background: "#FEF1FC",
      routing: `/admin/employees/details/${this.data?.id}/training`
    },

    {
      id: "leave-periods",
      title: "Employee Leave",
      icon: "/assets/images/icons/employee-menu/leave-periods.png",  
      background: "#EDF1FC",
      routing: `/admin/employees/details/${this.data?.id}/leave-periods`
    },

    {
      id: "appraisal",
      title: "Appraisal",
      icon: "/assets/images/icons/employee-menu/appraisal.png",  
      background: "#EDF1FC",
      routing: `/admin/employees/details/${this.data?.id}/appraisal`
    },

    {
      id: "staff-warnings",
      title: "Staff Warnings",
      icon: "/assets/images/icons/employee-menu/staff-warnings.png",  
      background: "#FCF3EE",
      routing: `/admin/employees/details/${this.data?.id}/staff-warnings`
    },

    {
      id: "incidents",
      title: "Accidents / Incidents",
      icon: "/assets/images/icons/employee-menu/incidents.png",  
      background: "#D7F4F8",
      routing: `/admin/employees/details/${this.data?.id}/incidents`
    },

    {
      id: "availability",
      title: "Availability",
      icon: "/assets/images/icons/employee-menu/availability.png",  
      background: "#FEF1FC",
      routing: `/admin/employees/details/${this.data?.id}/availability`
    },

    {
      id: "available-shift",
      title: "Available Shift",
      icon: "/assets/images/icons/employee-menu/available-shift.png",  
      background: "#FCF3EE",
      routing: `/admin/employees/details/${this.data?.id}/available-shift`
    },

    {
      id: "service-calendar",
      title: "Service Calendar",
      icon: "/assets/images/icons/employee-menu/service-calendar.png",  
      background: "#D7F4F8",
      routing: `/admin/employees/details/${this.data?.id}/service-calendar`
    },*/

    {
      id: "employee-shift",
      title: "Employee Shift",
      icon: "/assets/images/icons/employee-menu/employee-shift.png",  
      background: "#EDF1FC",
      routing: `/admin/employees/details/${this.data?.id}/employee-shift`
    },
  ];

  constructor(
    private router: Router,
    public dialogRef: MatDialogRef<EmployeeMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) {
  
  }

  ngOnInit(): void {
  }
  
  navigateToMenu(menu: SideMenu){
    this.router.navigate([menu?.routing]).then(() => this.dialogRef.close());
  }

}
