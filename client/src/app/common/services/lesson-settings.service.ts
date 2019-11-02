import { Injectable } from '@angular/core';
import { LessonSettings } from '@app/common/models/model';

@Injectable({
    providedIn: 'root',
})
export class LessonSettingsService {
    public settings: LessonSettings;
    constructor() {
        this.settings = new LessonSettings();
    }
}
