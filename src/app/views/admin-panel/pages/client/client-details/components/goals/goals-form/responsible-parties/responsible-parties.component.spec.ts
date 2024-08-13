import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsiblePartiesComponent } from './responsible-parties.component';

describe('ResponsiblePartiesComponent', () => {
  let component: ResponsiblePartiesComponent;
  let fixture: ComponentFixture<ResponsiblePartiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsiblePartiesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsiblePartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
