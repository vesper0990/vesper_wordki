import { Injectable } from "@angular/core";

@Injectable()
export class StoperService {

    private _isRunning: boolean;
    get isRunning(): boolean {
        return this._isRunning
    }

    private counter: number;
    private startTime: number;

    constructor() {
        this.counter = 0;
    }

    start(): void {
        this.startTime = new Date().getTime();
        this._isRunning = true;
    }

    stop(): void {
        this.counter += this.getIncrement();
        this._isRunning = false;
    }

    reset(): void {
        if (this._isRunning) {
            this.stop();
        }
        this.counter = 0;
    }

    getTime(): number {
        return this.counter + this.getIncrement();
    }

    private getIncrement(): number {
        const now = new Date().getTime();
        const increment = now - this.startTime;
        return increment;
    }
}