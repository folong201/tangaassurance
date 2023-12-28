import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InactiveassuranceComponent } from './inactiveassurance.component';

describe('InactiveassuranceComponent', () => {
  let component: InactiveassuranceComponent;
  let fixture: ComponentFixture<InactiveassuranceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InactiveassuranceComponent]
    });
    fixture = TestBed.createComponent(InactiveassuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
