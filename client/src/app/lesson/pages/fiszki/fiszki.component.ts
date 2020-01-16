import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LessonState } from '../../store/reducer';
import { GetWordsAction, GetWordsFromGroupAction, SetLessonMode, ResetStoreAction } from '../../store/actions';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LessonModeType } from '../../models/lesson-mode';
import { isAnyWord } from '../../store/selectors';

@Component({
  templateUrl: './fiszki.component.html',
  styleUrls: ['./fiszki.component.scss']
})
export class FiszkiComponent implements OnInit, OnDestroy {
  private routeParamSub: Subscription;
  private nextWordSub: Subscription;

  constructor(private lessonStore: Store<LessonState>,
    private route: ActivatedRoute,
    private router: Router) {
  }

  ngOnInit(): void {
    this.routeParamSub = this.route.params.subscribe((params: Params) => this.handleRouteParam(params));
    this.nextWordSub = this.lessonStore.select(isAnyWord).subscribe((isAny: boolean) => this.handleIsAnyWord(isAny));

  }

  ngOnDestroy(): void {
    this.routeParamSub.unsubscribe();
    this.nextWordSub.unsubscribe();
    this.lessonStore.dispatch(new ResetStoreAction());
  }

  private handleRouteParam(value: Params): void {
    const id = +value['id'];
    if (id) {
      this.lessonStore.dispatch(new SetLessonMode({ mode: LessonModeType.Group }));
      this.lessonStore.dispatch(new GetWordsFromGroupAction({ groupId: id }));
    } else {
      this.lessonStore.dispatch(new SetLessonMode({ mode: LessonModeType.Repeat }));
      this.lessonStore.dispatch(new GetWordsAction({ count: 2 }));
    }
  }

  private handleIsAnyWord(isAny: boolean): void {
    if (!isAny) {
      this.router.navigate(['dashboard']);
    }
  }
}
