import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFormsMainComponent } from './sso.component';

describe('MyFormsMainComponent', () => {
  let component: MyFormsMainComponent;
  let fixture: ComponentFixture<MyFormsMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyFormsMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyFormsMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
