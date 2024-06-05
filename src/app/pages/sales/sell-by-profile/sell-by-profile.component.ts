import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sell-by-profile',
  templateUrl: './sell-by-profile.component.html',
  styleUrl: './sell-by-profile.component.css'
})
export class SellByProfileComponent {
  @Input() accountType: any;

  constructor(){
    
  }
}
