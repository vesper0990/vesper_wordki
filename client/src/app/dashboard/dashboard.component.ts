import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, Observable } from 'rxjs';
import { HttpClient } from 'selenium-webdriver/http';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  vestValue = 'test';

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    console.log('1');
    // this.get().then(x => {
    //   console.log('3');
    //   sleep(5000);
    //   this.vestValue = x;
    // });
    this.get2().subscribe(x => {
      console.log('3');
      sleep(5000);
      this.vestValue = x;
    });
    console.log('2');
  }

  lesson(): void {
    this.router.navigate(['/lesson/repeat']);
  }

  private async get(): Promise<string> {
    return of<string>('newValue').toPromise();
  }

  private get2(): Observable<string> {
    return of<string>('newValue');
  }
}

export function sleep(milliseconds: number) {
  const start = new Date().getTime();
  for (let i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds) {
      break;
    }
  }
}
