import { Component, OnInit, Inject } from '@angular/core';
import { 
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { ColumnSelector, DialogData, ClientList } from '../../utils/client-list-model';

@Component({
  selector: 'client-delete-row-dialog',
  templateUrl: './delete-row-dialog.component.html',
  styleUrls: ['./delete-row-dialog.component.scss']
})
export class DeleteRowDialogComponent implements OnInit {

  public selectedRows: ClientList[] = [];

  constructor(public dialogRef: MatDialogRef<DeleteRowDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {

    console.log(this.data.selectedRows)
    this.selectedRows = this.data.selectedRows;
    //this.dialogRef.disableClose = true;
  }

  ngOnInit(): void {

  }

  /* REMOVE SELECTED ROW */
  removeSelected(item: ClientList): void{
    let index = this.selectedRows.indexOf(item)
    this.selectedRows.splice(index, 1);
  }

  closeDialog(): void {
    this.dialogRef.close({
      selectedRows: [],
      cancel: true
    });
  }


  closeSaveDialog(): void {
    this.dialogRef.close({
      selectedRows: this.selectedRows,
      cancel: false
    });
  }

}
