import { Injectable } from '@angular/core';
import { Result, LessonSettings } from '@app/common/models/model';
import { Group } from '@app/common/models/Group';

@Injectable({
    providedIn: 'root'
  })
export class LessonResultService {
    result: Result;
    group: Group = new Group();

    constructor() {
    }

    initializeResult(lessonSettings: LessonSettings, wordsCount: number): void {
        this.result = new Result();
        this.result.groupId = lessonSettings.group.id;
        this.result.translationDirection = lessonSettings.translationDirectionEnum;
        this.result.lessonType = lessonSettings.lessonTypeEnum;
        this.result.invisible = lessonSettings.group.words.length - wordsCount;
        this.group = lessonSettings.group;
        console.log(this.result);
    }

    startLesson(): void{
        this.result.dateTime = new Date();
    }

    pauseLesson(): void{
        this.result.timeCount += (new Date().getTime() - this.result.dateTime.getTime()) / 1000;
    }

    increaseCorrect():void{
        this.result.correct++;
    }

    increaseAccepted(): void{
        this.result.accepted++;
    }

    increaseWrong(): void{
        this.result.wrong++;
    }
}
