import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-client-totals',
  templateUrl: './client-totals.component.html',
  styleUrls: ['./client-totals.component.scss']
})
export class ClientTotalsComponent implements OnInit {

  @Input() serviceScheduleForm!: FormGroup;
  @Input() hourForm!: FormGroup;
  @Input() clientTotalForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
