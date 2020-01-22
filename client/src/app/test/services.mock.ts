import { ObservableMock } from './utils';
import { Params } from '@angular/router';

export class ActivatedRouteMock {
    public paramsSubject = new ObservableMock<Params>();
    public params = this.paramsSubject.getSource();
}
