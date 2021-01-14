import { TimerService } from './timer.service';

describe('TimerService', () => {

    let service: TimerService;
    const mockDate = new Date(2020, 1, 15);

    beforeEach(() => {
        jasmine.clock().install();
        jasmine.clock().mockDate(mockDate);
        service = new TimerService();
        service.init();
    });

    afterEach(() => {
        jasmine.clock().uninstall();
    });

    it('should have initialized value', () => {
        expect(service.getWholeTime()).toBe(0);
        service.isRunning().subscribe(value => expect(value).toBeFalse());
        service.time().subscribe(value => expect(value).toBe(0));
    });

    it('should running after start', () => {
        service.restart();
        service.isRunning().subscribe(value => expect(value).toBeTrue()).unsubscribe();
        service.stop();
    });

    it('should increase time after start', () => {
        service.restart();
        jasmine.clock().tick(2000);
        service.time().subscribe(value => expect(value).toBe(2)).unsubscribe();
        service.stop();
    });

    it('should resume', () => {
        service.restart();
        jasmine.clock().tick(2000);
        service.stop();
        jasmine.clock().tick(2000);
        service.resume();
        jasmine.clock().tick(2000);
        service.time().subscribe(value => expect(value).toBe(4)).unsubscribe();
        service.stop();
    });

});
