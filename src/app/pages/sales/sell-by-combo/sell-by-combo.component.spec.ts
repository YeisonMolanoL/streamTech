import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellByComboComponent } from './sell-by-combo.component';

describe('SellByComboComponent', () => {
  let component: SellByComboComponent;
  let fixture: ComponentFixture<SellByComboComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellByComboComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellByComboComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
