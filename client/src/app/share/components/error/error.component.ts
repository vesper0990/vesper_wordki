import { Component, OnInit, OnDestroy } from '@angular/core';
import { ErrorService } from './error-service';

@Component({
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit, OnDestroy {

  errorMessage: string;
  errorObject: any;

  constructor(private errorService: ErrorService) {
  }

  ngOnInit() {
    this.errorMessage = this.errorService.errorMessage;
    this.errorObject = this.errorService.error;
  }

  ngOnDestroy(): void {
    this.errorService.clearError();
  }
}
