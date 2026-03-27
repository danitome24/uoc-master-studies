import {Component, OnInit} from '@angular/core';
import {OffersService} from 'src/app/shared/services/offers.service';
import {ProfileService} from 'src/app/shared/services/profile.service';
import {select, Store} from '@ngrx/store';
import * as fromOffer from '../actions/offer.actions';
import * as fromOfferSelects from '../reducers/offer.reducer';

@Component({
    selector: 'app-offers-list',
    templateUrl: './offers-list.component.html'
})
export class OffersListComponent implements OnInit {
    public offersStudy$;
    public offersOther$;
    public displayColumns = ['job', 'company', 'category', 'date', 'province', 'municipe', 'subscribed', 'actions']

    constructor(
        private profileService: ProfileService,
        private offersService: OffersService,
        private store: Store
    ) {
        this.selectOffers();
    }

    private selectOffers() {
        this.store.dispatch(fromOffer.actions.listOffers({}));
        this.offersStudy$ = this.store.pipe(
            select(fromOfferSelects.selectOffersByUserStudies),
        );
        this.offersOther$ = this.store.pipe(
            select(fromOfferSelects.selectOffersNotMatchingUserStudies)
        );
    }

    ngOnInit() {
    }
}
