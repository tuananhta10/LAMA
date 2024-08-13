import { Component, OnInit, Inject } from '@angular/core';
import { 
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-filter-multiple',
  templateUrl: './filter-multiple.component.html',
  styleUrls: ['./filter-multiple.component.scss']
})
export class FilterMultipleComponent implements OnInit {
  public columns: any[] =  [];
  public filteredColumns: any[] = [];
  public selected: any[] =  [];
  public displayedColumns: any[];
  public drag: boolean = false;
  public searchBy: string = '';

  constructor(public dialogRef: MatDialogRef<FilterMultipleComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {
    // get all columns
    let column = [...this.data.list].map(el => {
      let index = this.data?.filteredList?.findIndex(_el => el[this.data?.groupBy?.toLowerCase()]?.id === _el[this.data?.groupBy?.toLowerCase()]?.id);

      return {
        selected: index !== -1,
        ...el
      }
    });

    this.columns = [...column];
    this.filteredColumns = [...column];
    this.selected = [...column].filter(el => el.selected);
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
        return el;
      })
    });
  }

  /*
    update selected item
  */
  updateSelectedItem(item): void {
    let i = this.selected?.findIndex(el => el[this.data?.groupBy?.toLowerCase()]?.id === item[this.data?.groupBy?.toLowerCase()]?.id);

    if(i !== -1)
      this.selected.splice(i, 1)
    
    else this.selected.push(item);
  }

  /*
    list table filter
  */
  searchByType(): void {
    const searchColumn = [...this.columns].filter(el => {
      return JSON.stringify(el[this.data?.groupBy?.toLowerCase()])
        .toLowerCase()
        .includes(this.searchBy.toLowerCase());
    });

    this.filteredColumns = searchColumn;
  }


}
