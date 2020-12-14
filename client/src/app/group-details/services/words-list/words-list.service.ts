import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AddWord, GetGroupDetails, GetWords, RemoveWordAction, ShowDialog, UpdateWord } from '../../store/actions';
import { GroupDetailsState } from '../../store/state';
import { selectDialogCard, selectDialogMode, selectDialogVisibility, selectGroupDetails, selectIsCardsLoading, selectWords } from '../../store/selectors';
import { map, tap } from 'rxjs/operators';
import { DialogMode } from 'src/app/share/components/edit-group-dialog/mode-dialog';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { HideDialog } from 'src/app/groups-list/store/actions';
import { CardDetails, GroupDetails } from 'src/app/share/models/card-details';

@Injectable()
export class CardsListService {

    groupId: number;

    constructor(private readonly store: Store<GroupDetailsState>) { }

    init(): void {

        // this.actRoute.params.subscribe(params => {
        //     console.log(params);
        //     this.handleRouteParam(params['id']);
        // });
    }

    getCards(): Observable<CardDetails[]> {
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
        return this.store.select(selectDialogCard);
    }

    openDialogToAdd(): void {
        this.store.dispatch(new ShowDialog({ mode: 'add', card: new EditWord(0, this.groupId, '', '', '', '', true) }));
    }

    openDialogToEdit(card: CardDetails): void {
        this.store.dispatch(new ShowDialog(
            {
                mode: 'edit',
                card: new EditWord(
                    card.id,
                    this.groupId,
                    card.front.value,
                    card.front.example,
                    card.back.value,
                    card.back.example,
                    card.front.isVisible)
            }));
    }

    dialogCancel(): void {
        this.store.dispatch(new HideDialog());
    }

    dialogSave(editCard: EditWord): void {
        editCard.groupId = this.groupId;
        const action = editCard.id === 0 ? new AddWord({ editword: editCard }) : new UpdateWord({ editword: editCard });
        this.store.dispatch(action);
    }

    dialogRemove(cardId: number): void {
        this.store.dispatch(new RemoveWordAction({ groupId: this.groupId, wordId: cardId }));
    }


    handleRouteParam(groupId: number): void {
        this.groupId = groupId;
        this.store.dispatch(new GetGroupDetails({ groupId: this.groupId }));
        this.store.dispatch(new GetWords({ groupId: this.groupId }));
    }
}
