import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-editable-form-table',
  templateUrl: './editable-form-table.component.html',
  styleUrls: ['./editable-form-table.component.scss']
})
export class EditableFormTableComponent implements OnInit {

  @Output() addEvent: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteEvent: EventEmitter<any> = new EventEmitter<any>();
  @Input() data: any[] = [];
  @Input() columns: any[] = [];
  @Input() label: any = '';
  @Input() isAddEnabled: boolean = false;
  @Input() isDeleteEnabled: boolean = false;
  @Input() isViewMore: boolean = true;
  @Input() link: string = '';

  public toAdd: boolean = false;
  colSpan: number = 0;
  
  constructor() { }

  ngOnInit(): void {
    //console.log(this.data);
    this.colSpan = this.isDeleteEnabled ? (this.columns.length + 1) : this.columns.length;
  }

  delete(index) {
    this.deleteEvent.emit(index);
  }

  add(){
    this.toAdd = true;
    this.addEvent.emit(null);
  }

  getMaxRate(header_col, data, index){
    
  }
}
