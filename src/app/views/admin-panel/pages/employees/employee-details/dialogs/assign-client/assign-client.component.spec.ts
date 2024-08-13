import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignClientComponent } from './assign-client.component';

describe('AssignClientComponent', () => {
  let component: AssignClientComponent;
  let fixture: ComponentFixture<AssignClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
