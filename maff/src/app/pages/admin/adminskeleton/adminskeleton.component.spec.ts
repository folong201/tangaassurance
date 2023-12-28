import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminskeletonComponent } from './adminskeleton.component';

describe('AdminskeletonComponent', () => {
  let component: AdminskeletonComponent;
  let fixture: ComponentFixture<AdminskeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminskeletonComponent]
    });
    fixture = TestBed.createComponent(AdminskeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
