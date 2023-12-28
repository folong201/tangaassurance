import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserdashboardskeletonComponent } from './userdashboardskeleton.component';

describe('UserdashboardskeletonComponent', () => {
  let component: UserdashboardskeletonComponent;
  let fixture: ComponentFixture<UserdashboardskeletonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserdashboardskeletonComponent]
    });
    fixture = TestBed.createComponent(UserdashboardskeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
