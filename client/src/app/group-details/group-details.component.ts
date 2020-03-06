import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { GroupDetails } from './models/group-details.model';
import { Word } from './models/word.model';
import { filter } from 'rxjs/operators';
import { GroupDetailsState } from './store/reducre';
import { Store } from '@ngrx/store';
import { getGroupDetails, getWords, getIsGroupDetailsLoading, getIsWordsLoading } from './store/selectors';
import { GetGroupDetailsAction, GetWordsAction, UpdateWordAction } from './store/actions';

@Component({
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailsComponent implements OnInit, OnDestroy {

  private groupId: number;
  private routeParamSub: Subscription;

  groupDetails$: Observable<GroupDetails>;
  isGroupDetailsLoading$: Observable<boolean>;
  words$: Observable<Word[]>;
  isWordsLoading$: Observable<boolean>;
  editingWord: Word = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private groupDetailsStore: Store<GroupDetailsState>) { }

  ngOnInit(): void {
    this.groupDetails$ = this.groupDetailsStore.select(getGroupDetails);
    this.isGroupDetailsLoading$ = this.groupDetailsStore.select(getIsGroupDetailsLoading);
    this.words$ = this.groupDetailsStore.select(getWords);
    this.isWordsLoading$ = this.groupDetailsStore.select(getIsWordsLoading);
    this.routeParamSub = this.route.params
      .pipe(filter((params: Params) => params['id'] != null))
      .subscribe((params: Params) => this.handleRouteParam(params));
  }

  ngOnDestroy(): void {
    this.routeParamSub.unsubscribe();
  }

  startLesson(): void {
    this.router.navigate(['lesson/fiszki', this.groupId]);
  }

  private handleRouteParam(value: Params): void {
    this.groupId = +value['id'];
    this.groupDetailsStore.dispatch(new GetGroupDetailsAction({ groupId: this.groupId }));
    this.groupDetailsStore.dispatch(new GetWordsAction({ groupId: this.groupId }));
  }

  onEditWord(word: Word): void {
    this.editingWord = word;
  }

  onEditSubmit(word: Word): void {
    this.groupDetailsStore.dispatch(new UpdateWordAction({word: word}));
    this.editingWord = null;
  }

}
