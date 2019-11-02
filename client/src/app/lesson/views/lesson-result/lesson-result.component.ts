import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LessonResultService } from '../../services/lesson-result.service';
import { LessonTypeEnum, Result } from '@app/common/models/model';
import { ResultSenderBase, WordSenderBase } from '@app/common/services';

@Component({
  templateUrl: './lesson-result.component.html',
  styleUrls: ['./lesson-result.component.css']
})
export class LessonResultComponent implements OnInit {

  correct: number;
  accepted: number;
  wrong: number;

  constructor(public lessonResultService: LessonResultService,
    private resultSender: ResultSenderBase,
    private wordSender: WordSenderBase,
    private router: Router) { }

  ngOnInit() {
    if (this.lessonResultService.result == null) {
      this.router.navigate(['/wordki/groups']);
      return;
    }
    this.correct = this.lessonResultService.result.correct;
    this.wrong = this.lessonResultService.result.wrong;
    if (this.lessonResultService.result.lessonType === LessonTypeEnum.Typing) {
      this.accepted = this.lessonResultService.result.accepted;
    }
    this.resultSender.add(this.lessonResultService.result)
      .subscribe((result: Result) => this.onResultAddSuccess(result), (error: any) => this.onResultAddFailed(error));
    this.wordSender.updateAll(this.lessonResultService.group.words)
      .subscribe(() => this.onWordsUpdateSuccess(), (error: any) => this.onWordsUpdateFailed(error));
  }

  private onResultAddSuccess(result: Result): void {

  }

  private onResultAddFailed(error: any): void {
    console.log(error);
  }

  private onWordsUpdateSuccess(): void {

  }

  private onWordsUpdateFailed(error: any): void {
    console.log(error);
  }

}
