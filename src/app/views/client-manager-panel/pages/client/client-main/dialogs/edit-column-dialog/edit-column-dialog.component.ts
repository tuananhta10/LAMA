import { Component, OnInit, Inject } from '@angular/core';
import { 
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { ColumnSelector, DialogData } from '../../utils/client-list-model';

@Component({
  selector: 'client-edit-column-dialog',
  templateUrl: './edit-column-dialog.component.html',
  styleUrls: ['./edit-column-dialog.component.scss']
})
export class EditColumnDialogComponent implements OnInit {
  public columns: ColumnSelector[] =  [];
  public selected: ColumnSelector[] =  [];
  public displayedColumns: any[];
  public drag: boolean = false;

  constructor(public dialogRef: MatDialogRef<EditColumnDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    // set selected columns on load
    let index = (el) => this.data.selectedColumns.indexOf(el.col_name);

    // get all columns
    let column = [...this.data.displayedColumns].map(el => {
      return {
        selected: index(el) !== -1,
        ...el
      }
    }).filter(el => el.col_name !== 'action');

    this.columns = column.filter(el => index(el) === -1).sort((a,b) => a.title.localeCompare(b.title));
    this.selected = column.filter(el => index(el) !== -1);
    this.displayedColumns = column.sort((a,b) => a.title.localeCompare(b.title));
  }

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  closeSaveDialog(): void {
    this.dialogRef.close({
      selectedColumns: this.selected
    });
  }

  drop(event: CdkDragDrop<ColumnSelector[]>): any {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data, 
        event.previousIndex, 
        event.currentIndex
      );
    } 

    else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    // populate checkbox
    if(this.drag){
      // make sure items on the left are not selected
      this.columns = this.columns.map(el => {
        el['selected'] = false;
        return el;
      });

      this.selected = this.selected.map(el => {
        el['selected'] = true;
        return el;
      });

      this.displayedColumns = [...this.columns, ...this.selected].sort((a,b) => a.title.localeCompare(b.title));
    }
  }

  /*
    update selected column
  */
  updateSelectedColumn(item): void {
    let index = this.selected.indexOf(item);
    let col_index = this.columns.indexOf(item);

    if(index === -1){
      item['selected'] = true;
      this.selected.push(item);
      this.columns.splice(col_index, 1);
    }

    else {
      item['selected'] = false;
      this.selected.splice(index, 1);
      this.columns.push(item);
    }
  }

}
