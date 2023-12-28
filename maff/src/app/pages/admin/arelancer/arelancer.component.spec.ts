import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArelancerComponent } from './arelancer.component';

describe('ArelancerComponent', () => {
  let component: ArelancerComponent;
  let fixture: ComponentFixture<ArelancerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArelancerComponent]
    });
    fixture = TestBed.createComponent(ArelancerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
