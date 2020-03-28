import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  @Input() isLogin: boolean;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  logout(): void {
    this.router.navigate(['/user/logout']);
  }

}
