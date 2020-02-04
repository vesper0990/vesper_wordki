import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { GroupDetailsProviderBase } from './services/group-details.provider/group-details.provider';
import { GroupDetails } from './models/group-details.model';
import { Word } from './models/word.model';

@Component({
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupDetailsComponent implements OnInit, OnDestroy {

  private routeParamSub: Subscription;

  groupDetails: GroupDetails;
  editingWord: Word = null;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private groupDetailsProvider: GroupDetailsProviderBase) { }

  ngOnInit(): void {
    this.routeParamSub = this.route.params.subscribe((params: Params) => this.handleRouteParam(params));
  }

  ngOnDestroy(): void {
    this.routeParamSub.unsubscribe();
  }

  startLesson(): void {
    this.router.navigate(['lesson/fiszki', this.groupDetails.id]);
  }

  private handleRouteParam(value: Params): void {
    const id = +value['id'];
    this.groupDetailsProvider.getGroupDetails(id).subscribe((groupDetails: GroupDetails) => {
      this.groupDetails = groupDetails;
    });
  }

  onEditWord(word: Word): void {
    this.editingWord = word;
  }

}
