import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactuspageComponent } from './contactuspage.component';

describe('ContactuspageComponent', () => {
  let component: ContactuspageComponent;
  let fixture: ComponentFixture<ContactuspageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ContactuspageComponent]
    });
    fixture = TestBed.createComponent(ContactuspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
