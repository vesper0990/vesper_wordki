import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../styles-users.scss']
})
export class LoginComponent implements OnInit {

  constructor(private readonly titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Wordki - Login');
  }
}
