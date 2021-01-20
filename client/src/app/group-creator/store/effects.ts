import { Injectable } from '@angular/core';
import * as actions from './actions';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { GroupCreatorState } from './state';
import { Store } from '@ngrx/store';
import { selectNewGroupModel, selectParseModel } from './selectors';
import { GroupParserService } from '../services/group-parser/group-parser.service';
import { GroupCreatorHttpServiceBase } from '../services/group-creator-http/group-creator-http.service.base';
import { Router } from '@angular/router';
import { RequestFailed } from 'src/app/store/actions';
import { of } from 'rxjs';

@Injectable()
export class GroupCreatorEffects {

    constructor(private readonly actions$: Actions,
        private readonly store: Store<GroupCreatorState>,
        private readonly groupParser: GroupParserService,
        private readonly groupCreatorHttp: GroupCreatorHttpServiceBase,
        private readonly router: Router) { }

    @Effect()
    parseNewCards$ = this.actions$.pipe(
        ofType<actions.ParseNewCards>(actions.GroupCreatorActions.ParseNewCards),
        withLatestFrom(this.store.select(selectParseModel)),
        map(([, value]) => this.groupParser.parseFile(value.fileContent, value.rowElements)),
        map(newCards => new actions.ParseNewCardsComplate({ newCards: newCards }))
    );

    @Effect()
    saveNewGroup$ = this.actions$.pipe(
        ofType<actions.SaveNewGroup>(actions.GroupCreatorActions.SaveNewGroup),
        withLatestFrom(this.store.select(selectNewGroupModel)),
        map(([, model]) => model),
        switchMap(model => this.groupCreatorHttp.save(model)),
        map(groupId => new actions.SaveNewGroupSuccess({ groupId: groupId })),
        catchError(error => of(new RequestFailed({ error: error })))
    );

    @Effect({ dispatch: false })
    saveNewGroupSuccess$ = this.actions$.pipe(
        ofType<actions.SaveNewGroupSuccess>(actions.GroupCreatorActions.SaveNewGroupSuccess),
        tap(action => this.router.navigate(['details', action.payload.groupId]))
    );
}
