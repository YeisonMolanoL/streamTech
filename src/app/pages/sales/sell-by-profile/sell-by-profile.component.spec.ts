import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellByProfileComponent } from './sell-by-profile.component';

describe('SellByProfileComponent', () => {
  let component: SellByProfileComponent;
  let fixture: ComponentFixture<SellByProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellByProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellByProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
