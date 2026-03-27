import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import * as fromMyOffers from '../reducers/my-offers.reducer';
import * as fromOffer from '../actions/offer.actions';

@Component({
    selector: 'app-offers-profile',
    templateUrl: './offers-profile.component.html'
})
export class OffersProfileComponent implements OnInit {
    public offers$;
    public displayColumns = ['job', 'company', 'category', 'date', 'province', 'municipe', 'actions'];

    constructor(private store: Store) {
        this.selectOffers();
    }

    private selectOffers() {
        this.store.dispatch(fromOffer.actions.listOffers({}));
        this.offers$ = this.store.pipe(
            select(fromMyOffers.selectMyOffers),
        );
    }

    ngOnInit() {
    }
}
