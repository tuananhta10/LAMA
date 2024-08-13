import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExternalProvidersComponent } from './external-providers.component';

describe('ExternalProvidersComponent', () => {
  let component: ExternalProvidersComponent;
  let fixture: ComponentFixture<ExternalProvidersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExternalProvidersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExternalProvidersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
