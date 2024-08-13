import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shift-location',
  templateUrl: './shift-location.component.html',
  styleUrls: ['./shift-location.component.scss']
})
export class ShiftLocationComponent implements OnInit {
  @Input() serviceScheduleForm!: FormGroup;
  @Input() clientTotalForm!: FormGroup;
  @Input() hourForm!: FormGroup;
  @Input() shiftLocationForm!: FormGroup;

  public chargeTravel: any[] = ["No", "Yes: Add to Service Hours", "Yes: Invoice Separately"]

  constructor() { }

  ngOnInit(): void {
    // on change of support item name

    // charge travel to client
    this.shiftLocationForm.controls['charge_travel_to_client'].valueChanges
    .subscribe((value) => {
      if(value === 'No'){
        this.shiftLocationForm.controls['travel_hours'].setValue(0);
        this.shiftLocationForm.controls['travel_distance'].setValue(0);
        this.shiftLocationForm.controls['total_travel_km'].setValue(0);
        this.shiftLocationForm.controls['transport_distance'].setValue(0);
        this.shiftLocationForm.controls['total_transport'].setValue(0);
        this.shiftLocationForm.controls['travel_time_rate'].setValue(0);
      }
    });

    // Formula Total Travel KM
    // Travel Distance * Travel Distance Rate

    // Formula for Total Transport
    // Travel Hours * Travel Time Rate


    // travel distance adjusted
    this.shiftLocationForm.controls['travel_distance'].valueChanges
    .subscribe((value) => {
      let travel_distance_rate = this.shiftLocationForm.controls['travel_distance_rate'].value * 1;
      let travel_distance = value * 1;  

      let travel_hours = this.shiftLocationForm.controls['travel_hours'].value * 1;
      let travel_time_rate = this.shiftLocationForm.controls['travel_time_rate'].value * 1;
      
      this.shiftLocationForm.controls['total_travel_km'].setValue(
        (travel_distance_rate * travel_distance)
      );

      this.shiftLocationForm.controls['travel_total'].setValue(
        (travel_distance_rate * travel_distance) + 
        (travel_hours * travel_time_rate) 
      );
    });

    // travel distance rate adjusted
    this.shiftLocationForm.controls['travel_distance_rate'].valueChanges
    .subscribe((value) => {
      let travel_distance_rate = this.shiftLocationForm.controls['travel_distance_rate'].value * 1;
      let travel_distance = this.shiftLocationForm.controls['travel_distance'].value * 1;

      let travel_hours = this.shiftLocationForm.controls['travel_hours'].value * 1;
      let travel_time_rate = this.shiftLocationForm.controls['travel_time_rate'].value * 1;
      
      this.shiftLocationForm.controls['total_travel_km'].setValue(
        (travel_distance_rate * travel_distance)
      );

      this.shiftLocationForm.controls['travel_total'].setValue(
        (travel_distance_rate * travel_distance) + 
        (travel_hours * travel_time_rate) 
      );
    });

    // travel hours adjusted
    this.shiftLocationForm.controls['travel_hours'].valueChanges
    .subscribe((value) => {
      let total_travel_km = this.shiftLocationForm.controls['total_travel_km'].value * 1;
      let travel_hours = this.shiftLocationForm.controls['travel_hours'].value * 1;
      let travel_time_rate = value * 1;

      this.shiftLocationForm.controls['travel_total'].setValue(
        (total_travel_km) + 
        (travel_hours * travel_time_rate) 
      );
    });

    // travel distance rate adjusted
    this.shiftLocationForm.controls['travel_time_rate'].valueChanges
    .subscribe((value) => {
      let total_travel_km = this.shiftLocationForm.controls['total_travel_km'].value * 1;
      let travel_hours = this.shiftLocationForm.controls['travel_hours'].value * 1;
      let travel_time_rate = value * 1;

      this.shiftLocationForm.controls['travel_total'].setValue(
        (total_travel_km) + 
        (travel_hours * travel_time_rate) 
      );
    });

    this.shiftLocationForm.controls['travel_total'].valueChanges
    .subscribe((value) => {
      let currentTotal =  this.clientTotalForm.controls['calculated_cost'].value * 1;
      let total =Math.round((currentTotal + (value * 1)) * 100) / 100;

      this.clientTotalForm.controls['travel_total'].setValue(value * 1);
      this.clientTotalForm.controls['client_total'].setValue(total);
    });

    // TRANSPORT DETAILS
    this.shiftLocationForm.controls['transport_distance'].valueChanges.subscribe((value) => {
      let transport_distance_rate = this.shiftLocationForm.controls['transport_distance_rate'].value * 1;
      
      this.shiftLocationForm.controls['total_transport'].setValue(transport_distance_rate * (value * 1));
    });

    this.shiftLocationForm.controls['transport_distance_rate'].valueChanges.subscribe((value) => {
      let transport_distance = this.shiftLocationForm.controls['transport_distance'].value * 1;
      
      this.shiftLocationForm.controls['total_transport'].setValue(transport_distance * (value * 1));
    });
  }
}
