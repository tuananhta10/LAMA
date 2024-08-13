import { Component, OnInit, Inject } from '@angular/core';
import { 
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { ClientList, ClientDetailSimple } from '../../utils/client-list-model';
import { Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'app-client-list-simple-detail-dialog',
  animations: [mainAnimations],
  templateUrl: './client-list-simple-detail-dialog.component.html',
  styleUrls: ['./client-list-simple-detail-dialog.component.scss']
})
export class ClientListSimpleDetailDialogComponent implements OnInit {

  public clientDetail: ClientList;
  public bannerImg: boolean = false;
  public defaultImage: string = '/assets/images/icons/user-placeholder.png';

  constructor(public dialogRef: MatDialogRef<ClientListSimpleDetailDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ClientDetailSimple,
    private router: Router) {

    this.clientDetail = this.data?.clientDetail;
    setTimeout(() => this.bannerImg = true, 50);
    console.log(this.data)
  }

  setDate(date){
    return new Date(date || null)
  }

  ngOnInit(): void {

  }

  visitProfile(): void {
    this.dialogRef.close();
    this.router.navigate([`/admin/clients/details/${this.clientDetail?.id}`])
  }

  editDetails(): void {
    this.dialogRef.close();
    this.router.navigate([`/admin/clients/edit/${this.clientDetail?.id}`])
  }

  viewProfile(): void {
    //this.router.navigate([`/admin/clients/details/${row?.id}`])
    this.dialogRef.close();
  }

}
