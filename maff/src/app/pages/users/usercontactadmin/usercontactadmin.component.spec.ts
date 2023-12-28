import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsercontactadminComponent } from './usercontactadmin.component';

describe('UsercontactadminComponent', () => {
  let component: UsercontactadminComponent;
  let fixture: ComponentFixture<UsercontactadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsercontactadminComponent]
    });
    fixture = TestBed.createComponent(UsercontactadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
