import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminmessageComponent } from './adminmessage.component';

describe('AdminmessageComponent', () => {
  let component: AdminmessageComponent;
  let fixture: ComponentFixture<AdminmessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminmessageComponent]
    });
    fixture = TestBed.createComponent(AdminmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
