import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPayrateLoadingComponent } from './add-payrate-loading.component';

describe('AddPayrateLoadingComponent', () => {
  let component: AddPayrateLoadingComponent;
  let fixture: ComponentFixture<AddPayrateLoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPayrateLoadingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPayrateLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
