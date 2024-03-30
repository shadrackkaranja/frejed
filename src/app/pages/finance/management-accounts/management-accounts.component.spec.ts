import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAccountsComponent } from './management-accounts.component';

describe('ManagementAccountsComponent', () => {
  let component: ManagementAccountsComponent;
  let fixture: ComponentFixture<ManagementAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManagementAccountsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManagementAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
