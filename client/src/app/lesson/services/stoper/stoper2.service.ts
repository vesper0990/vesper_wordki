import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class StoperService {

    private isRunningSubject: BehaviorSubject<boolean>;

    private counter: number;
    private startTime: number;

    constructor() {
        this.counter = 0;
        this.isRunningSubject = new BehaviorSubject(false);
    }

    private setIsRunning(value: boolean): void {
        this.isRunningSubject.next(value);
    }

    stop(): void {
        this.counter += new Date().getTime() - this.startTime;
        this.setIsRunning(false);
    }

    resume(): void {
        this.startTime = new Date().getTime();
        this.setIsRunning(true);
    }

    restart(): void {
        this.counter = 0;
        this.startTime = new Date().getTime();
        this.setIsRunning(true);
    }

    getObservable(): Observable<boolean> {
        return this.isRunningSubject.asObservable();
    }

    getWholeTime(): number {
        return this.counter;
    }
}
