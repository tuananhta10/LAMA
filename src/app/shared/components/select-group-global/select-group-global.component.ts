import { Component, OnInit, Inject } from '@angular/core';
import { 
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-select-group-global',
  templateUrl: './select-group-global.component.html',
  styleUrls: ['./select-group-global.component.scss']
})
export class SelectGroupGlobalComponent implements OnInit {
  public columns: any[] =  [];
  public filteredColumns: any[] = [];
  public selected: any[] =  [];
  public displayedColumns: any[];
  public drag: boolean = false;
  public searchBy: string = '';
  public all: boolean = false;

  constructor(public dialogRef: MatDialogRef<SelectGroupGlobalComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    // get all columns
    let column = [...this.data?.data]

    this.columns = [...column];
    this.filteredColumns = [...column]
    .filter(el => !!el)
    .map(el => {
      return {
        selected: false,  
        title: el
      }
    });

    this.selected = [...column].filter(el => !!el).filter(el => el.selected);
  }

  ngOnInit(): void {

  }

  closeDialog(): void {
    this.dialogRef.close();
  }


  closeSaveDialog(): void {
    this.dialogRef.close({
      filteredList: this.selected.map(el => {
        delete el["selected"];
        return el?.title;
      })
    });
  }

  /*
    update selected item
  */
  updateSelectedItem(item): void {
    if(item !== 'All'){
      let i = this.selected?.findIndex(el => el === item);

      if(i !== -1) this.selected.splice(i, 1)
        else this.selected.push(item);

      this.all = false;
    }

    else {
      if(this.all){
        this.selected = [...this.filteredColumns];  
        this.filteredColumns.forEach(el => el['selected'] = true)
      }

      else {
        this.selected = [];  
        this.filteredColumns.forEach(el => el['selected'] = false)
      }
    }
  }

  /*
    list table filter
  */
  searchByType(): void {
    const searchColumn = [...this.columns].filter(el => {
      return el.toLowerCase().includes(this.searchBy.toLowerCase());
    });

    this.filteredColumns = searchColumn;
  }

}
