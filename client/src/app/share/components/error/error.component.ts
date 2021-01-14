import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ErrorService } from './services/error/error-service';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  errorMessage: string;
  errorObject: any;

  constructor(private errorService: ErrorService,
    private readonly titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Wordki - Error');
    this.errorMessage = this.errorService.errorMessage;
    this.errorObject = this.errorService.error;
  }

  ngOnDestroy(): void {
    this.errorService.clearError();
  }
}
