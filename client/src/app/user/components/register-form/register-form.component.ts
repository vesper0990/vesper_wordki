import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { RegisterService } from './services/register/register.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss', '../../styles-users.scss'],
})
export class RegisterFormComponent implements OnInit {

  registerForm: FormGroup;
  errors$: Observable<string[]>;

  constructor(private readonly service: RegisterService) { }

  ngOnInit(): void {
    this.registerForm = this.service.getForm();
    this.errors$ = this.service.getErrors();
  }

  onSubmit(): void {
    this.service.sendRegisterRequest();
  }
}
