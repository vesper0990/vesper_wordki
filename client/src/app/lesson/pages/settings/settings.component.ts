import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { LessonState } from '../../store/reducer';
import { Store } from '@ngrx/store';
import { SetLessonSettingsAction } from '../../store/actions';
import { LessonSettings } from '../../models/lesson-settings';
import { LanguageType } from 'src/app/share/models/language-type.mode';
import { UserService } from 'src/app/authorization/services/user.service/user.service';
import { LessonMode } from '../../models/lesson-mode';

@Component({
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {

  languages: LanguageType[] = LanguageType.getAll();

  settingsForm = this.fb.group({
    questionLanguage: (''),
    answerLanguage: (''),
    mode: (''),
    allWords: ('')
  });

  constructor(private fb: FormBuilder,
    private lessonStore: Store<LessonState>,
    private userService: UserService) { }

  ngOnInit(): void {
    this.initForm();
    if (this.userService.userSettings) {
      this.languages = this.userService.userSettings.languages;
    }
  }

  private initForm(): void {
    this.settingsForm.patchValue({
      questionLanguage: LanguageType.getLanguageType(1),
      answerLanguage: LanguageType.getLanguageType(2),
      mode: 3,
      allWords: false
    });
  }

  startLesson(): void {
    const lessonSettings = {
      allWords: this.settingsForm.get('allWords').value,
      mode: LessonMode.get(this.settingsForm.get('mode').value),
      answerLanguage: this.settingsForm.get('answerLanguage').value,
      questionLanguage: this.settingsForm.get('questionLanguage').value
    } as LessonSettings;
    this.lessonStore.dispatch(new SetLessonSettingsAction({ lessonSettings: lessonSettings }));
  }
}
