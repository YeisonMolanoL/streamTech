import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAccountDataModalComponent } from './edit-account-data-modal.component';

describe('EditAccountDataModalComponent', () => {
  let component: EditAccountDataModalComponent;
  let fixture: ComponentFixture<EditAccountDataModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditAccountDataModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditAccountDataModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
