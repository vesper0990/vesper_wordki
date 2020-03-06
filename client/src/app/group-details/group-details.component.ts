import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { GroupDetailsProviderBase } from './services/group-details.provider/group-details.provider';
import { GroupDetails } from './models/group-details.model';
import { Word } from './models/word.model';
import { filter } from 'rxjs/operators';

@Component({
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailsComponent implements OnInit, OnDestroy {

  private groupId: number;
  private routeParamSub: Subscription;

  groupDetails$: Observable<GroupDetails>;
  words$: Observable<Word[]>;
  editingWord: Word = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private groupDetailsProvider: GroupDetailsProviderBase) { }

  ngOnInit(): void {
    this.route.params.pipe(filter((params: Params) => params['id'] != null)).subscribe((params: Params) => this.handleRouteParam(params));
  }

  ngOnDestroy(): void {
    this.routeParamSub.unsubscribe();
  }

  startLesson(): void {
    this.router.navigate(['lesson/fiszki', this.groupId]);
  }

  private handleRouteParam(value: Params): void {
    this.groupId = +value['id'];
    this.groupDetails$ = this.groupDetailsProvider.getGroupDetails(this.groupId);
    this.words$ = this.groupDetailsProvider.getWords(this.groupId);
  }

  onEditWord(word: Word): void {
    this.editingWord = word;
  }

}
