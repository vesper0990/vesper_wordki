import { ClickStopPropagationDirective } from './click-stop-propagation.dirctive';

describe('ClickStopPropagationDirective', () => {

    it('should onClick', () => {
        const event = { stopPropagation: () => { } };
        spyOn(event, 'stopPropagation');
        const directive = new ClickStopPropagationDirective();
        directive.onClick(event);
        expect(event.stopPropagation).toHaveBeenCalledTimes(1);
    });
});
