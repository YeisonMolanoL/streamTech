import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleAccountComponent } from './sale-account.component';

describe('SaleAccountComponent', () => {
  let component: SaleAccountComponent;
  let fixture: ComponentFixture<SaleAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
