import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../styles-users.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private readonly titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Wordki - Register');
  }

}
