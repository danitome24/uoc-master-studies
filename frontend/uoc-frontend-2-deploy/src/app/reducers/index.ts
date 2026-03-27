import {ActionReducerMap, MetaReducer} from '@ngrx/store';
import {environment} from '../../environments/environment';
import {routerReducer} from '@ngrx/router-store';
import {storeFreeze} from 'ngrx-store-freeze';
import * as fromAuth from '../auth/reducers/auth.reducer';
import {AuthEffects} from '../auth/effects/auth.effects';
import * as fromConfig from '../profile/reducers/configuration.reducer';
import * as fromOffer from '../offers/reducers/offer.reducer';
import * as fromMyOffer from '../offers/reducers/my-offers.reducer';
import {OfferEffects} from '../offers/effects/offer.effects';

export interface State {
    router;
    auth: fromAuth.State;
    preferences: fromConfig.State;
    offers: fromOffer.State;
    my_offers: fromMyOffer.State;
}

export const reducers: ActionReducerMap<State> = {
    router: routerReducer,
    auth: fromAuth.reducer,
    preferences: fromConfig.reducer,
    offers: fromOffer.reducer,
    my_offers: fromMyOffer.reducer,
};

export const effects = [AuthEffects, OfferEffects];

export const metaReducers: MetaReducer<State>[] = !environment.production ? [storeFreeze] : [];
