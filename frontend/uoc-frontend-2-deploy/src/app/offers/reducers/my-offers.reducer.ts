import * as fromMyOffers from '../actions/my-offers.actions';
import {State as OfferState} from '../reducers/offer.reducer';
import {createFeatureSelector, createSelector} from '@ngrx/store';
import {Offer} from '../../shared/models/offer.model';

export interface State {
    entities: [] | number[];
}

export const initialState: State = {
    entities: [],
};

export function reducer(state: State = initialState, action) {
    switch (action.type) {
        case fromMyOffers.SUBSCRIBE_TO_OFFER:
            return {
                entities: [...state.entities, action.offerId]
            };

        case fromMyOffers.UNSUBSCRIBE_TO_OFFER:
            const entities = state.entities.filter(offerId => offerId !== action.offerId);
            return {
                entities
            };
        default:
            return state;
    }
}

// Selectors
export const selectMyOffersFeature = createFeatureSelector('my_offers');
export const selectOffersFeature = createFeatureSelector('offers');
export const selectMyOffers = createSelector(
    selectMyOffersFeature,
    selectOffersFeature,
    (myOffers: State, offers: OfferState) => {
        return offers.entities.filter((offer: Offer) => {
            return myOffers.entities.some(myOfferId => myOfferId === offer.id);
        });
    }
);
export const selectIsUserSubscribedTo = createSelector(
    selectMyOffersFeature,
    (myOffers: State, props: { offerId: number }) => {
        return myOffers.entities.some(myOfferId => myOfferId === props.offerId);
    }
);
