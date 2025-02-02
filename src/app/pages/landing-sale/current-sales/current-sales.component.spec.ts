import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentSalesComponent } from './current-sales.component';

describe('CurrentSalesComponent', () => {
  let component: CurrentSalesComponent;
  let fixture: ComponentFixture<CurrentSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CurrentSalesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrentSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
