import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentCostComponent } from './employment-cost.component';

describe('EmploymentCostComponent', () => {
  let component: EmploymentCostComponent;
  let fixture: ComponentFixture<EmploymentCostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmploymentCostComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmploymentCostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
