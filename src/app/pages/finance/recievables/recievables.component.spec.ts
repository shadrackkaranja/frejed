import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecievablesComponent } from './recievables.component';

describe('RecievablesComponent', () => {
  let component: RecievablesComponent;
  let fixture: ComponentFixture<RecievablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecievablesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RecievablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
