import { CardDetails, Drawer, ExtendedCardDetails, SideDetails } from '../share/models/card-details';
import { LanguageType } from '../share/models/language-type.mode';

export function createExtendedCardDetails(): ExtendedCardDetails {
    return new ExtendedCardDetails(
        1,
        'group-name',
        new SideDetails('front-value', 'front-example', new Drawer(1), LanguageType.getLanguageType(1),
            1, true, new Date()),
        new SideDetails('front-value', 'front-example', new Drawer(1), LanguageType.getLanguageType(1),
            1, true, new Date())
    );
}

export function createCardDetails(): CardDetails {
    return new CardDetails(
        1,
        new SideDetails('front-value', 'front-example', new Drawer(1), LanguageType.getLanguageType(1),
            1, true, new Date()),
        new SideDetails('front-value', 'front-example', new Drawer(1), LanguageType.getLanguageType(1),
            1, true, new Date())
    );
}