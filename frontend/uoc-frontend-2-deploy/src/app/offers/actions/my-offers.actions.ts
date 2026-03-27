import {createAction, props} from '@ngrx/store';

export const SUBSCRIBE_TO_OFFER = '[My-Offers Page] SubscribeToOffer';
export const UNSUBSCRIBE_TO_OFFER = '[My-Offers Page] UnsubscribeToOffer';

export const actions = {
    subscribeToOffer: createAction(
        SUBSCRIBE_TO_OFFER,
        props<{ offerId: number }>()
    ),
    unsubscribeToOffer: createAction(
        UNSUBSCRIBE_TO_OFFER,
        props<{ offerId: number }>()
    )
};
