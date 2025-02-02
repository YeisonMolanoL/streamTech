import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCombosComponent } from './sale-combos.component';

describe('SaleCombosComponent', () => {
  let component: SaleCombosComponent;
  let fixture: ComponentFixture<SaleCombosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleCombosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleCombosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
