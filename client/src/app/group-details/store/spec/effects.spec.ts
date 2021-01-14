import { TestBed } from '@angular/core/testing';
import { GroupDetails } from 'src/app/share/models/card-details';
import { LanguageType } from 'src/app/share/models/language-type.mode';
import { reducer } from '../reducer';
import { GroupDetailsState } from '../state';
import * as actions from '../actions';
import { provideMockActions } from '@ngrx/effects/testing';
import { GroupDetailsEffects } from '../effects';
import { GroupDetailsHttpBase } from '../../services/group-details-http/group-details-http.service.base';
import { getAllMethods } from 'src/app/test/helpers.spec';
import { GroupDetailsHttp } from '../../services/group-details-http/group-details-http.service';
import { of, ReplaySubject, throwError } from 'rxjs';
import { EditWord } from 'src/app/share/components/edit-word-dialog/edit-word.model';
import { catchError } from 'rxjs/operators';

const mockInitState: GroupDetailsState = {
    groupDetails:
        new GroupDetails(1,
            'name',
            LanguageType.getLanguageType(1),
            LanguageType.getLanguageType(2),
            1,
            2,
            new Date(2020, 1, 15)),
    isGroupDetailsLoading: false,
    words: [],
    isWordsLoading: false,

    dialogVisibility: false,
    dialogMode: 'add',
    dialogCard: null
};

function testReducer(state: GroupDetailsState, action: actions.GroupDetailsActions): GroupDetailsState {
    return reducer(mockInitState, action);
}

describe('GroupDetails Store', () => {

    let httpService: jasmine.SpyObj<GroupDetailsHttpBase>;
    let effects: GroupDetailsEffects;
    let actions$: ReplaySubject<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: GroupDetailsHttpBase, useValue: jasmine.createSpyObj(getAllMethods(GroupDetailsHttp)) },
                GroupDetailsEffects,
                provideMockActions(() => actions$)
            ]
        });
        httpService = TestBed.inject(GroupDetailsHttpBase) as jasmine.SpyObj<GroupDetailsHttpBase>;
        effects = TestBed.inject(GroupDetailsEffects);
    });

    beforeEach(() => {
        actions$ = new ReplaySubject(1);

    });

    it('should create', () => {
        expect(effects).toBeTruthy();
    });


    it('should GetGroupDetails', () => {
        const result = new GroupDetails(2,
            'name',
            LanguageType.getLanguageType(1),
            LanguageType.getLanguageType(2),
            1,
            2,
            new Date(2020, 1, 15));
        httpService.getGroupDetails.withArgs(1).and.returnValue(of(result));
        actions$.next(new actions.GetGroupDetails({ groupId: 1 }));

        effects.getGroupDetailsEffect.subscribe(value => {
            expect(value).toEqual(new actions.GetGroupDetailsSuccess({ groupDetails: result }));
        });
        expect(httpService.getGroupDetails).toHaveBeenCalledWith(1);
    });

    it('should GetGroupDetails when error', () => {
        const errorExpected = {};
        const id = 2;
        httpService.getGroupDetails.withArgs(id).and.returnValue(throwError(errorExpected));

        actions$.next(new actions.GetGroupDetails({ groupId: id }));

        effects.getGroupDetailsEffect.pipe(catchError(error => {
            expect(error).toEqual(errorExpected);
            return of();
        })).subscribe();
    });

    it('should GetWords', () => {
        const result = [];
        httpService.getWords.withArgs(1).and.returnValue(of(result));
        actions$.next(new actions.GetWords({ groupId: 1 }));

        effects.getWordsEffect.subscribe(value => {
            expect(value).toEqual(new actions.GetWordsSuccess({ words: result }));
        });
        expect(httpService.getWords).toHaveBeenCalledWith(1);
    });

    it('should GetWords when error', () => {
        const errorExpected = {};
        const id = 2;
        httpService.getWords.withArgs(id).and.returnValue(throwError(errorExpected));

        actions$.next(new actions.GetWords({ groupId: id }));

        effects.getWordsEffect.pipe(catchError(error => {
            expect(error).toEqual(errorExpected);
            return of();
        })).subscribe();
    });

    it('should UpdateWord', () => {
        let index = 0;
        const editCard = {} as EditWord;
        httpService.updateWord.withArgs(editCard).and.returnValue(of({}));
        actions$.next(new actions.UpdateWord({ editword: editCard }));

        effects.updateWordEffect.subscribe(value => {
            if (index === 0) {
                expect(value).toEqual(new actions.UpdateWordSuccess({ editWord: editCard }));
            } else if (index === 1) {
                expect(value).toEqual(new actions.HideDialog());
            }
            index++;
        });
        expect(httpService.updateWord).toHaveBeenCalledWith(editCard);
    });

    it('should UpdateWord when error', () => {
        const errorExpected = {};
        const editWord = { id: 1 } as EditWord;
        httpService.updateWord.withArgs(editWord).and.returnValue(throwError(errorExpected));

        actions$.next(new actions.UpdateWord({ editword: editWord }));

        effects.updateWordEffect.pipe(catchError(error => {
            expect(error).toEqual(errorExpected);
            return of();
        })).subscribe();
    });

    it('should AddWord', () => {
        let index = 0;
        const editCard = { groupId: 2 } as EditWord;
        httpService.addWord.withArgs(editCard).and.returnValue(of({}));
        actions$.next(new actions.AddWord({ editword: editCard }));

        effects.addWordEffect.subscribe(value => {
            if (index === 0) {
                expect(value).toEqual(new actions.GetWords({ groupId: 2 }));
            } else if (index === 1) {
                expect(value).toEqual(new actions.HideDialog());
            }
            index++;
        });
        expect(httpService.addWord).toHaveBeenCalledWith(editCard);
    });

    it('should addWord when error', () => {
        const errorExpected = {};
        const editWord = { id: 1 } as EditWord;
        httpService.addWord.withArgs(editWord).and.returnValue(throwError(errorExpected));

        actions$.next(new actions.AddWord({ editword: editWord }));

        effects.addWordEffect.pipe(catchError(error => {
            expect(error).toEqual(errorExpected);
            return of();
        })).subscribe();
    });

    it('should AddWord', () => {
        let index = 0;
        httpService.removeWord.withArgs(1, 1).and.returnValue(of({}));
        actions$.next(new actions.RemoveWordAction({ wordId: 1, groupId: 1 }));

        effects.removeWordEffect.subscribe(value => {
            if (index === 0) {
                expect(value).toEqual(new actions.RemoveWordSuccess({ wordId: 1 }));
            } else if (index === 1) {
                expect(value).toEqual(new actions.HideDialog());
            }
            index++;
        });
        expect(httpService.removeWord).toHaveBeenCalledWith(1, 1);
    });

    it('should addWord when error', () => {
        const errorExpected = {};
        httpService.removeWord.withArgs(1, 1).and.returnValue(throwError(errorExpected));

        actions$.next(new actions.RemoveWordAction({ wordId: 1, groupId: 1 }));

        effects.removeWordEffect.pipe(catchError(error => {
            expect(error).toEqual(errorExpected);
            return of();
        })).subscribe();
    });

});
