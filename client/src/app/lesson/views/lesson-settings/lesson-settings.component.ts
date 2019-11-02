import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Language, LanguageEnum, LessonTypeEnum, TranslationDirectionEnum, LessonType } from '@app/common/models/model';
import { LessonSettingsService } from '../../../common/services/lesson-settings.service';
import { LanguagesProvider } from '@app/common/services/languages.provider';
import { LessonTypeProvider } from '@app/common/services/lesson.type.provider';
import { Group } from '@app/common/models/Group';

@Component({
  templateUrl: './lesson-settings.component.html',
  styleUrls: ['./lesson-settings.component.scss']
})
export class LessonSettingsComponent implements OnInit {

  languages: Language[];

  selectedLanguage: Language;

  allWords: boolean;

  lessonTypes = LessonTypeProvider.lessonTypes;
  selectedLessonType: LessonType;

  constructor(private lessonSettingsService: LessonSettingsService,
    private router: Router,
    private cookies: CookieService) {
    this.allWords = true;
  }

  ngOnInit() {
    if (this.lessonSettingsService.settings.group == null) {
      this.router.navigate(['../wordki/database/groups']);
      return;
    }
    this.languages = [
      LanguagesProvider.languages[this.lessonSettingsService.settings.group.language1],
      LanguagesProvider.languages[this.lessonSettingsService.settings.group.language2]
    ];
    if (this.cookies.check('allWords')) {
      this.allWords = JSON.parse(this.cookies.get('allWords'));
    }
    if (this.cookies.check('translationDirectionEnum')) {
      this.selectedLanguage = LanguagesProvider.languages[this.getQuestionLanguage(
        this.lessonSettingsService.settings.group,
        JSON.parse(this.cookies.get('translationDirectionEnum'))
      )];
    }
    if (this.cookies.check('lessonTypeEnum')) {
      this.selectedLessonType = this.lessonTypes[JSON.parse(this.cookies.get('lessonTypeEnum'))];
    }
  }

  startLesson(): void {
    // todo  check if all option was choosed
    let url: string;
    switch (this.selectedLessonType.lessonTypeEnum) {
      case LessonTypeEnum.Fiszki:
        url = '/wordki/lesson/fiszki';
        break;
      case LessonTypeEnum.Typing:
        url = '/wordki/lesson/typing';
        break;
    }
    this.lessonSettingsService.settings.translationDirectionEnum =
      this.getTranslationDirection(this.lessonSettingsService.settings.group, this.selectedLanguage.languageEnum);
    this.lessonSettingsService.settings.allWords = this.allWords;
    this.lessonSettingsService.settings.lessonTypeEnum = this.selectedLessonType.lessonTypeEnum;
    this.cookies.set('allWords', JSON.stringify(this.lessonSettingsService.settings.allWords));
    this.cookies.set('translationDirectionEnum', JSON.stringify(this.lessonSettingsService.settings.translationDirectionEnum));
    this.cookies.set('lessonTypeEnum', JSON.stringify(this.lessonSettingsService.settings.lessonTypeEnum));
    this.router.navigate([url]);
  }

  private getTranslationDirection(group: Group, language: LanguageEnum): TranslationDirectionEnum {
    if (group.language1 === language) {
      return TranslationDirectionEnum.FromFirst;
    } else {
      return TranslationDirectionEnum.FromSecond;
    }
  }

  private getQuestionLanguage(group: Group, translationDirection: TranslationDirectionEnum): LanguageEnum {
    if (translationDirection === TranslationDirectionEnum.FromFirst) {
      return group.language1;
    } else {
      return group.language2;
    }
  }
}
