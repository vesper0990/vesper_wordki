import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GroupDetails } from '../../models/group-details.model';
import { Word } from '../../models/word.model';
import { GetGroupDetails, GetWords, RemoveWordAction, ShowDialog, UpdateWord } from '../../store/actions';
import { GroupDetailsState } from '../../store/state';
import { selectDialogCard, selectDialogMode, selectDialogVisibility, selectGroupDetails, selectIsCardsLoading, selectWords } from '../../store/selectors';
import { ActivatedRoute } from '@angular/router';
import { map, tap } from 'rxjs/operators';
import { DialogMode } from 'src/app/share/components/edit-group-dialog/mode-dialog';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { HideDialog } from 'src/app/groups-list/store/actions';

@Injectable()
export class CardsListService {

    groupId: number;

    constructor(private readonly store: Store<GroupDetailsState>,
        private readonly actRoute: ActivatedRoute) { }

    init(): void {
        this.handleRouteParam(this.actRoute.snapshot.params.id);
    }

    getCards(): Observable<Word[]> {
        return this.store.select(selectWords);
    }

    isCardsLoading(): Observable<boolean> {
        return this.store.select(selectIsCardsLoading);
    }

    getGroupDetails(): Observable<GroupDetails> {
        return this.store.select(selectGroupDetails);
    }

    isDialogVisible(): Observable<boolean> {
        return this.store.select(selectDialogVisibility).pipe(
            tap(value => console.log(value))
        );
    }

    getDialogMode(): Observable<DialogMode> {
        return this.store.select(selectDialogMode);
    }

    getDialogCard(): Observable<EditWord> {
        return this.store.select(selectDialogCard).pipe(
            map(card => {
                return card === null || card === undefined ?
                    {} as EditWord :
                    {
                        wordId: card.id,
                        language1: card.language1,
                        language2: card.language2,
                        example1: card.example1,
                        example2: card.example2,
                        isVisible: card.isVisible
                    } as EditWord;
            })
        );
    }

    openDialogToAdd(): void {
        this.store.dispatch(new ShowDialog({ mode: 'add' }));
    }

    openDialogToEdit(card: Word): void {
        this.store.dispatch(new ShowDialog({ mode: 'edit', card: card }));
    }

    dialogCancel(): void {
        this.store.dispatch(new HideDialog());
    }

    dialogSave(editCard: EditWord): void {
        this.store.dispatch(new UpdateWord({ editword: editCard }));
    }

    dialogRemove(cardId: number): void {
        this.store.dispatch(new RemoveWordAction({ groupId: this.groupId, wordId: cardId }));
    }


    private handleRouteParam(groupId: number): void {
        this.groupId = groupId;
        this.store.dispatch(new GetGroupDetails({ groupId: this.groupId }));
        this.store.dispatch(new GetWords({ groupId: this.groupId }));
    }
}
