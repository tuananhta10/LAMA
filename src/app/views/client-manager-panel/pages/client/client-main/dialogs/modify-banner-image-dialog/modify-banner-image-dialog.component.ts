import { Component, OnInit, Inject } from '@angular/core';
import { 
  MatDialog, 
  MatDialogRef, 
  MAT_DIALOG_DATA 
} from '@angular/material/dialog';
import { ClientListBanner } from '../../utils/client-list-model';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { base64ToFile,  } from 'ngx-image-cropper';
import { mainAnimations } from '@app-main-animation';

@Component({
  selector: 'client-modify-banner-image-dialog',
  animations: [mainAnimations],
  templateUrl: './modify-banner-image-dialog.component.html',
  styleUrls: ['./modify-banner-image-dialog.component.scss']
})
export class ModifyBannerImageDialog implements OnInit {
  public defaultImage = '/assets/images/placeholder/image-placeholder-2.png';
  public selectedImage: ClientListBanner;

  public image_src: string = '';
  public converted_image_src: any;

  public imageChangedEvent: any = '';
  public croppedImage: any = '';

  constructor(public dialogRef: MatDialogRef<ModifyBannerImageDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ClientListBanner) {

    console.log(this.data)
    this.image_src = this.data?.image_src;
    this.getBase64ImageFromUrl(this.image_src).then(result => {
      if(this.data.option === 'edit'){
        this.converted_image_src = result;
        this.croppedImage = result;
      }
      console.log("BASE 64 IMAGE", result)
    })
  }

  ngOnInit(): void {

  }

  async getBase64ImageFromUrl(imageUrl) {
    let res = await fetch(imageUrl);
    let blob = await res.blob();

    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.addEventListener("load", function () {
          resolve(reader.result);
      }, false);

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    })
  }

  /*CANCEL DIALOG*/
  closeDialog(): void {
    this.dialogRef.close({
      image_src: this.image_src,
      cancel: true
    });
  }

  /*SAVE CHANGES WITH THE IMAGE*/
  closeSaveDialog(): void {
    this.dialogRef.close({
      image_src: this.croppedImage,
      cancel: false
    });
  }

  /*DELETE IMAGE FROM COLLECTION*/
  closeDeleteDialog(): void {
    this.dialogRef.close({
      image_src: this.image_src,
      cancel: false
    });
  }

  fileChangeEvent(event: any): void {
    console.log(event)
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }

  imageLoaded(image?: any) {
    this.croppedImage = image
  }

  cropperReady() {
      // cropper ready
  }
  loadImageFailed() {
      // show message
  }

  clickInput(id): void{
    document.getElementById(id).click();
  }
}
