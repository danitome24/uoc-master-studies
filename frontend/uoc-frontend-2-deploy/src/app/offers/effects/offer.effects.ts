import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as fromOffer from '../actions/offer.actions';
import {map, switchMap} from 'rxjs/operators';
import {OffersService} from '../../shared/services/offers.service';

@Injectable()
export class OfferEffects {
    constructor(private actions$: Actions, private offersService: OffersService) {
    }

    // @ts-ignore
    listOffers$ = createEffect(() => this.actions$.pipe(
        ofType(fromOffer.LIST_OFFERS),
        switchMap(() => {
            return this.offersService.getOffers();
        }),
        map(offers => {
            return fromOffer.actions.listOffersSuccess({offers});
        })
    ));
}
