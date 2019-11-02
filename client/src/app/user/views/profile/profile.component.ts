import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {

  isVisible = false;
  items = ['1', '2', '3'];

  constructor() { }

  ngOnInit() {
  }

  click(): void {
    this.isVisible = true;
  }

}
