import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferrerDetailsComponent } from './referrer-details.component';

describe('ReferrerDetailsComponent', () => {
  let component: ReferrerDetailsComponent;
  let fixture: ComponentFixture<ReferrerDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReferrerDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferrerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
