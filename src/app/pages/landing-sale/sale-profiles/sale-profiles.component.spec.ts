import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleProfilesComponent } from './sale-profiles.component';

describe('SaleProfilesComponent', () => {
  let component: SaleProfilesComponent;
  let fixture: ComponentFixture<SaleProfilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaleProfilesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SaleProfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
