import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArchiveItemComponent } from './delete-archive-item.component';

describe('DeleteArchiveItemComponent', () => {
  let component: DeleteArchiveItemComponent;
  let fixture: ComponentFixture<DeleteArchiveItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteArchiveItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteArchiveItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
