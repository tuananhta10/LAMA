import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { mainAnimations } from '@app-main-animation';
import { Router, ActivatedRoute } from '@angular/router';
import { HelpFaqsMenu, HelpFaqs } from '../utils/help-model-interface';

@Component({
  selector: 'app-help-main',
  animations: [mainAnimations],
  templateUrl: './help-main.component.html',
  styleUrls: ['./help-main.component.scss']
})
export class HelpMainComponent implements OnInit {
  public helpFaqsDefault: HelpFaqs[] = HelpFaqsMenu;
  public helpList: HelpFaqs[] = HelpFaqsMenu;
  public search: string = '';

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

  }

  searchDataSource(): void {
    const helpFaqs = [...this.helpFaqsDefault]
    .filter(el => {
      let transformed = {
        "question": el.question,
        "answer": el.answer,
      };
      
      return JSON.stringify(transformed).toLowerCase().includes(this.search.toLowerCase());
    });

    this.helpList = helpFaqs;
  }

}
