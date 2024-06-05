import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellByAccountComponent } from './sell-by-account.component';

describe('SellByAccountComponent', () => {
  let component: SellByAccountComponent;
  let fixture: ComponentFixture<SellByAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellByAccountComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellByAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
