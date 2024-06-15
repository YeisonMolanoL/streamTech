import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSaleListComponent } from './account-sale-list.component';

describe('AccountSaleListComponent', () => {
  let component: AccountSaleListComponent;
  let fixture: ComponentFixture<AccountSaleListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountSaleListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccountSaleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
