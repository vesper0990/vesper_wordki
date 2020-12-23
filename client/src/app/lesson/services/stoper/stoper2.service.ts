import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class TimerService {

    private isRunningSubject: BehaviorSubject<boolean>;
    private timeSubject: BehaviorSubject<number>;

    private counter: number;
    private startTime: number;

    private _counter: number;
    private interval: any;

    constructor() {
        this.counter = 0;
        this._counter = 0;
        this.isRunningSubject = new BehaviorSubject(false);
        this.timeSubject = new BehaviorSubject(0);
    }

    init(): void {
        this._counter = 0;
        this.timeSubject.next(this._counter);
        this.isRunningSubject.next(false);
    }
    // todo create finalize method

    private setIsRunning(value: boolean): void {
        this.isRunningSubject.next(value);
    }

    stop(): void {
        this.counter += new Date().getTime() - this.startTime;
        this.setIsRunning(false);
        if (this.interval !== null) {
            clearInterval(this.interval);
        }
    }

    resume(): void {
        this.startTime = new Date().getTime();
        this.setIsRunning(true);
        this.startInterval();
    }

    restart(): void { // todo split to start and resume
        this.counter = 0;
        this.startTime = new Date().getTime();
        this.setIsRunning(true);
        this.startInterval();
    }

    isRunning(): Observable<boolean> {
        return this.isRunningSubject.asObservable();
    }

    time(): Observable<number> {
        return this.timeSubject.asObservable();
    }

    getWholeTime(): number {
        return this.counter;
    }

    private startInterval(): void {
        this.interval = setInterval(() => {
            this._counter++;
            this.timeSubject.next(this._counter);
        }, 1000);
    }
}
