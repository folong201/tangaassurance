import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssurancelistComponent } from './assurancelist.component';

describe('AssurancelistComponent', () => {
  let component: AssurancelistComponent;
  let fixture: ComponentFixture<AssurancelistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AssurancelistComponent]
    });
    fixture = TestBed.createComponent(AssurancelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
