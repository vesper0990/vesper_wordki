import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectCurrentCard } from 'src/app/lesson/store/selectors';
import { LessonState } from 'src/app/lesson/store/state';
import { CardRepeat } from 'src/app/share/models/card-details';

@Injectable()
export class SettingsService {

    constructor(private readonly store: Store<LessonState>) { }

    getCurrentCard(): Observable<CardRepeat> {
        return this.store.select(selectCurrentCard);
    }
}
