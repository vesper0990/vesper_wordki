import { Component, OnInit, OnDestroy } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DialogMode } from '../share/components/edit-group-dialog/mode-dialog';
import { EditWord } from '../share/components/edit-word-dialog/edit-word.model';
import { GroupDetails } from './models/group-details.model';
import { Word } from './models/word.model';
import { CardsListService } from './services/words-list/words-list.service';

@Component({
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.scss'],
})
export class GroupDetailsComponent implements OnInit, OnDestroy {

  cards$: Observable<Word[]>;
  isCardsLoading$: Observable<boolean>;
  groupDetails$: Observable<GroupDetails>;
  isGroupDetailsLoading$: Observable<boolean>;

  dialogVisibility$: Observable<boolean>;
  dialogMode$: Observable<DialogMode>;
  dialogCard$: Observable<EditWord>;

  constructor(private readonly service: CardsListService,
    private readonly route: ActivatedRoute,
    private readonly titleService: Title) { }

  ngOnInit(): void {
    this.titleService.setTitle('Wordki - Details');
    this.service.handleRouteParam(+this.route.snapshot.paramMap.get('id'));
    this.cards$ = this.service.getCards();
    this.groupDetails$ = this.service.getGroupDetails();
    this.isCardsLoading$ = this.service.isCardsLoading();
    this.isGroupDetailsLoading$ = this.service.isCardsLoading(); // todo change to isGroupDetailsLoading$

    this.dialogVisibility$ = this.service.isDialogVisible();
    this.dialogMode$ = this.service.getDialogMode();
    this.dialogCard$ = this.service.getDialogCard();
  }

  ngOnDestroy(): void {
  }

  addCard(): void {
    this.service.openDialogToAdd();
  }

  editCard(card: Word): void {
    this.service.openDialogToEdit(card);
  }

  onEditCancel(): void {
    this.service.dialogCancel();
  }

  onEditSave(card: EditWord): void {
    this.service.dialogSave(card);
  }

  onEditRemove(id: number): void {
    this.service.dialogRemove(id);
  }
}
