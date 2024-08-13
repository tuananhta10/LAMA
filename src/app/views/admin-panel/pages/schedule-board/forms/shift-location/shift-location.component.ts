import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { combineLatest, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-shift-location',
  templateUrl: './shift-location.component.html',
  styleUrls: ['./shift-location.component.scss']
})
export class ShiftLocationComponent implements OnInit, OnDestroy {
  @Input() serviceScheduleForm!: FormGroup;
  @Input() clientTotalForm!: FormGroup;
  @Input() hourForm!: FormGroup;
  @Input() shiftLocationForm!: FormGroup;
  @Input() data:any
  @Input() isDisabled: boolean = false;
  private unsubscribe$ = new Subject<void>();

  public chargeTravel: any[] = ["No", "Yes: Add to Service Hours", "Yes: Invoice Separately"]

  constructor() { }

  ngOnInit(): void {
    this.subscribeToChargeTravel();

    combineLatest([
      this.shiftLocationForm.controls['travel_distance'].valueChanges,
      this.shiftLocationForm.controls['travel_distance_rate'].valueChanges,
      this.shiftLocationForm.controls['transport_distance_rate'].valueChanges,
      this.shiftLocationForm.controls['transport_distance'].valueChanges,
      this.shiftLocationForm.controls['travel_hours'].valueChanges,
    ]).pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe(([travel_distance, travel_distance_rate, transport_distance_rate, transport_distance, travel_hours]) => {
      if (travel_distance_rate > 1) {
        this.shiftLocationForm.controls['travel_distance_rate'].setErrors({ above: true });
        this.shiftLocationForm.controls['travel_distance_rate'].markAsTouched();
        return;
      }

      if (transport_distance_rate > 1) {
        this.shiftLocationForm.controls['transport_distance_rate'].setErrors({ above: true });
        this.shiftLocationForm.controls['transport_distance_rate'].markAsTouched();
        return;
      }

      if (travel_hours && travel_hours > 0 ) {
        const editable_rate_value = Number(this.clientTotalForm.controls['editable_rate_value'].value)
        this.shiftLocationForm.controls['travel_time_rate'].setValue(editable_rate_value);
      }else{
        this.shiftLocationForm.controls['travel_time_rate'].setValue(1);
      }

      this.calculateTravelAndTransport(
        parseFloat(travel_distance),
        parseFloat(travel_distance_rate),
        parseFloat(transport_distance_rate),
        parseFloat(transport_distance)
      );
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private subscribeToChargeTravel(): void {
    this.shiftLocationForm.controls['charge_travel_to_client'].valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        if (value === 'No') {
          this.resetFormControls();
        }
      });
  }

  private calculateTravelAndTransport(
    travel_distance: number,
    travel_distance_rate: number,
    transport_distance_rate: number,
    transport_distance: number
  ): void {
    
    const transport_total = transport_distance_rate * transport_distance;
    const travel_total_km = travel_distance_rate * travel_distance;
    const total_travel = transport_total + travel_total_km;
    this.shiftLocationForm.controls['total_travel_km'].setValue(parseFloat(travel_total_km.toFixed(2)));
    this.shiftLocationForm.controls['total_transport'].setValue(parseFloat(transport_total.toFixed(2)));
    this.shiftLocationForm.controls['travel_total'].setValue(!Number.isNaN(total_travel) ? +total_travel.toFixed(2) : 0);
    
    const travel_hours = Number(this.shiftLocationForm.controls['travel_hours'].value);
    const editable_rate_value = Number(this.clientTotalForm.controls['editable_rate_value'].value);
    const total_travel_time = travel_hours * editable_rate_value;
    const travel_total = this.shiftLocationForm.controls['travel_total'].value + total_travel_time;
    this.shiftLocationForm.controls['total_travel_time'].setValue(+total_travel_time.toFixed(2));
    // this.clientTotalForm.controls['total_hours'].setValue(parseFloat(travel_hours.toFixed(2)));
    this.clientTotalForm.controls['travel_total'].setValue(parseFloat(travel_total.toFixed(2)))
    
    const client_total = +this.clientTotalForm.controls['calculated_cost'].value + this.clientTotalForm.controls['travel_total'].value;
    this.clientTotalForm.controls['client_total'].setValue(parseFloat(client_total.toFixed(2)));
  }

  private resetFormControls(): void {
    this.shiftLocationForm.controls['travel_hours'].setValue(0);
    this.shiftLocationForm.controls['travel_distance'].setValue(0);
    this.shiftLocationForm.controls['total_travel_km'].setValue(0);
    this.shiftLocationForm.controls['transport_distance'].setValue(0);
    this.shiftLocationForm.controls['total_transport'].setValue(0);
    this.shiftLocationForm.controls['travel_time_rate'].setValue(0);
  }
}
