import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashCashEquivalentComponent } from './cash-cash-equivalent.component';

describe('CashCashEquivalentComponent', () => {
  let component: CashCashEquivalentComponent;
  let fixture: ComponentFixture<CashCashEquivalentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashCashEquivalentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CashCashEquivalentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
