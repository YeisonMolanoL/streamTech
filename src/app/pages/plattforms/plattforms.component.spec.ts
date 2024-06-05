import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlattformsComponent } from './plattforms.component';

describe('PlattformsComponent', () => {
  let component: PlattformsComponent;
  let fixture: ComponentFixture<PlattformsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlattformsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlattformsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
