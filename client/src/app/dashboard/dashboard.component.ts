import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  lesson(): void {
    this.router.navigate(['/lesson/repeat']);
  }

}
