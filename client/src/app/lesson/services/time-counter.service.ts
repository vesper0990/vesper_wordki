import { interval } from 'rxjs';

export class TimeCounterService {

  counter = 0;
  onTick: (number) => void;
  subscriber: any;

  start(): void {
    if (this.subscriber == null) {
      this.subscriber = interval(1000).subscribe(s => {
        this.counter++;
        this.onTick(this.counter);
      });
    }
  }

  stop(): void {
    if (this.subscriber) {
      this.subscriber.unsubscribe();
      this.subscriber = null;
    }
  }

  reset(): void {
    this.stop();
    this.counter = 0;
  }

  getTime(): number {
    return this.counter;
  }
}
