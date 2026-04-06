import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesToSendComponent } from './messages-to-send.component';

describe('MessagesToSendComponent', () => {
  let component: MessagesToSendComponent;
  let fixture: ComponentFixture<MessagesToSendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MessagesToSendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MessagesToSendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
