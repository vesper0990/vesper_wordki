import { Component, OnInit, OnDestroy } from '@angular/core';
import { StoperService } from '../../services/stoper/stoper.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-stoper',
  templateUrl: './stoper.component.html',
  styleUrls: ['./stoper.component.scss']
})
export class StoperComponent implements OnInit, OnDestroy {

  private stoperSubscription: Subscription;

  isRunning: boolean;

  constructor(private stoperService: StoperService) { }

  ngOnInit(): void {
    this.stoperSubscription = this.stoperService.getObservable().subscribe((value: boolean) => this.handleIsRunning(value));
  }

  ngOnDestroy(): void {
    this.stoperSubscription.unsubscribe();
  }

  start(): void {
    if (this.stoperService.getWholeTime() > 0) {
      this.stoperService.resume();
    } else {
      this.stoperService.restart();
    }
  }

  stop(): void {
    this.stoperService.stop();
  }

  private handleIsRunning(value: boolean): void {
    this.isRunning = value;
  }
}
