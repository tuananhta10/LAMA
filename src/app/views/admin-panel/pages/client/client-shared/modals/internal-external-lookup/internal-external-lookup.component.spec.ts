import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InternalExternalLookupComponent } from './internal-external-lookup.component';

describe('InternalExternalLookupComponent', () => {
  let component: InternalExternalLookupComponent;
  let fixture: ComponentFixture<InternalExternalLookupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InternalExternalLookupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InternalExternalLookupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
