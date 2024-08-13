import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { RouterModule } from '@angular/router';
import { AppHeaderComponent } from './header/header.component';
import { 
  FormsModule, 
  ReactiveFormsModule 
} from '@angular/forms';
import { HeaderOptionTwoComponent } from './header-option-two/header-option-two.component';
import { HeaderOptionThreeComponent } from './header-option-three/header-option-three.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    declarations: [AppHeaderComponent, HeaderOptionTwoComponent, HeaderOptionThreeComponent],
    exports: [AppHeaderComponent, HeaderOptionTwoComponent, HeaderOptionThreeComponent]
})
export class HeaderNavigationModule { }
