import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-form-table',
  animations: [mainAnimations],
  templateUrl: './form-table.component.html',
  styleUrls: ['./form-table.component.scss']
})
export class FormTableComponent implements OnInit {
  @Output() addEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() editEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() label: any = '';
  @Input() isAddEnabled: boolean = false;
  @Input() isDeleteEnabled: boolean = false;
  @Input() isViewMore: boolean = true;
  @Input() link: string = '';
  @Input() editable: boolean = false;

  colSpan: number = 0;
  
  constructor() { }

  ngOnInit(): void {
    console.log(this.isAddEnabled);
    
    //console.log(this.data);
    this.colSpan = this.isDeleteEnabled ? (this.columns.length + 1) : this.columns.length;
  }

  delete(index) {
    this.deleteEvent.emit(index);
  }

  add(){
    this.addEvent.emit(null);
  }

  openDialog(data){
    this.editEvent.emit(data)
  }
}
