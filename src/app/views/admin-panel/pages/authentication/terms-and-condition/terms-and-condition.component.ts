import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-terms-and-condition',
  templateUrl: './terms-and-condition.component.html',
  styleUrls: ['./terms-and-condition.component.scss']
})
export class TermsAndConditionComponent implements OnInit {

  constructor(public location: Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back()
  }

}
