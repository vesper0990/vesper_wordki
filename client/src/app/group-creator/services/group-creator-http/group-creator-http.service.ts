import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CardParsed } from '../../model/card-parsed';
import { GroupDetails } from '../../model/group-details';
import { GroupCreatorHttpServiceBase } from './group-creator-http.service.base';

@Injectable()
export class GroupCreatorHttpService extends GroupCreatorHttpServiceBase {

    constructor(private readonly http: HttpClient) {
        super();
    }

    save(model: { groupDetails: GroupDetails, cards: CardParsed[] }): Observable<number> {
        const body = {
            name: model.groupDetails.name,
            languageFront: model.groupDetails.frontLanguage.type,
            languageBack: model.groupDetails.backLanguage.type,
            cards: [],
        };
        body.cards = model.cards.map(item => {
            return {
                front: {
                    value: item.frontValue,
                    example: item.frontExample
                },
                back: {
                    value: item.backValue,
                    example: item.backExample
                }
            };
        });
        return this.http.post<number>(`${environment.apiUrl}/group/add`, body);
    }
}
