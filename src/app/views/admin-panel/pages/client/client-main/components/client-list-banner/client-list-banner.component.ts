import { 
  Component, 
  OnInit, 
  Input 
} from '@angular/core';
import { Router } from '@angular/router';
import { mainAnimations } from '@app-main-animation';
import { MatDialog } from '@angular/material/dialog';
import { ModifyBannerImageDialog } from '../../dialogs/modify-banner-image-dialog/modify-banner-image-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'admin-client-list-banner',
  animations: [mainAnimations],
  templateUrl: './client-list-banner.component.html',
  styleUrls: ['./client-list-banner.component.scss']
})
export class ClientListBannerComponent implements OnInit {
  @Input() loading: boolean = true;

  public defaultImage = '/assets/images/placeholder/image-placeholder-2.png';
  public images = [
    '/assets/images/placeholder/banner.png',
    '/assets/images/placeholder/banner-placeholder.png',
    'https://images.pexels.com/photos/259915/pexels-photo-259915.jpeg'
  ];

  constructor(private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog) { 

  }

  ngOnInit(): void {

  }

  /* 
    Modify image from client list banner
  */
  modifyImage(option: string, image: string, index: number): void {
    let dialogRef;

    // open modify image dialog
    dialogRef = this.dialog.open(ModifyBannerImageDialog, {
      panelClass: "dialog-responsive",
      width: '800px',
      data: {
        option: option,
        image_src: image,
        cancel: true
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      switch(true){
        // Add new image
        case result && !result.cancel && option === 'add':{
          this.images.push(result.image_src);

          // click newly added image
          setTimeout(() => document.getElementById(`carousel${this.images?.length - 1}`).click(), 300);

          break;
        }

        // Edit Image
        case result && !result.cancel && option === 'edit':{
          // update image src
          this.images[index] =  result.image_src;
          
          document.getElementById(`carousel0`).click();
          break;
        }

        // Delete Image
        case !result.cancel && option === 'delete':{
          // delete then show the previous image
          if(this.images?.length > 1 && index !== 0) {
            document.getElementById(`carousel${index - 1}`).click();
          }

          else document.getElementById(`carousel0`).click();

          this.images.splice(index, 1);
          break;
        }

        default: return;
      }
    });
  }

}
