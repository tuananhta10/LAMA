import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddExternalProvidersComponent } from './add-external-providers.component';

describe('AddExternalProvidersComponent', () => {
  let component: AddExternalProvidersComponent;
  let fixture: ComponentFixture<AddExternalProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddExternalProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddExternalProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
