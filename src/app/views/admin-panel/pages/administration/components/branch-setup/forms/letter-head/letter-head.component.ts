import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mainAnimations } from '@app-main-animation';;

@Component({
  selector: 'admin-branch-letter-head',
  templateUrl: './letter-head.component.html',
  styleUrls: ['./letter-head.component.scss']
})
export class LetterHeadComponent implements OnInit {

  @Input() letterHeadForm!: FormGroup;
  @Output() updateStepper = new EventEmitter<number>();
  @Output() submitData: EventEmitter<any> = new EventEmitter<any>();
  @Output() formStep: EventEmitter<string> = new EventEmitter<string>();
  @Output() isValid: EventEmitter<any> = new EventEmitter<any>();

  imgSrc: any;

  constructor() {
  }

  ngOnInit(){
    if(this.letterHeadForm.value['letter_head'])
      this.imgSrc = this.letterHeadForm.value['letter_head'][0]?.download_url;
  }

  onUpload(file: any) {
    this.imgSrc = file.file;
    this.letterHeadForm.get('letter_head').setValue(file);
  }

  ngOnDestroy(){
    this.isValid.emit({formStep: 4, isValid: this.letterHeadForm.valid})
  }
}
