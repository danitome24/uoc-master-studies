import {createAction, props} from '@ngrx/store';
import {Offer} from '../../shared/models/offer.model';

export const LIST_OFFERS = '[Offers Page] ListOffers';
export const LIST_OFFERS_SUCCESS = '[Offers Page] ListOffersSuccess';

export const actions = {
        listOffers: createAction(
            LIST_OFFERS,
            props<{}>()
        ),
        listOffersSuccess: createAction(
            LIST_OFFERS_SUCCESS,
            props<{ offers: [Offer] }>()
        )
    }
;
