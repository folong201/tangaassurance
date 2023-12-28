import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhileusComponent } from './whileus.component';

describe('WhileusComponent', () => {
  let component: WhileusComponent;
  let fixture: ComponentFixture<WhileusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WhileusComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WhileusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
