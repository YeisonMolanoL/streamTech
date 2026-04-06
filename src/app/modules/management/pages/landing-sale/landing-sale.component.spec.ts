import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingSaleComponent } from './landing-sale.component';

describe('LandingSaleComponent', () => {
  let component: LandingSaleComponent;
  let fixture: ComponentFixture<LandingSaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingSaleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
