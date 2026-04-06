import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellProfileListComponent } from './sell-profile-list.component';

describe('SellProfileListComponent', () => {
  let component: SellProfileListComponent;
  let fixture: ComponentFixture<SellProfileListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SellProfileListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SellProfileListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
