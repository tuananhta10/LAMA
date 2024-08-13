import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareWorkersComponent} from './care-workers.component';

describe('CareWorkersComponent', () => {
  let component: CareWorkersComponent;
  let fixture: ComponentFixture<CareWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CareWorkersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CareWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
