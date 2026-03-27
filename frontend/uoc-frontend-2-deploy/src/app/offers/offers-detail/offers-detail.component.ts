import {Component, OnInit} from '@angular/core';
import {OffersService} from 'src/app/shared/services/offers.service';
import {Offer} from 'src/app/shared/models/offer.model';
import {ProfileService} from 'src/app/shared/services/profile.service';
import {ActivatedRoute, Router} from '@angular/router';
import {User} from 'src/app/shared/models/user.model';
import {select, Store} from '@ngrx/store';
import * as fromMyOffers from '../actions/my-offers.actions';
import * as fromMyOffersReducer from '../reducers/my-offers.reducer';

@Component({
    selector: 'app-offers-detail',
    templateUrl: './offers-detail.component.html',
    styleUrls: ['./offers-detail.component.scss']
})
export class OffersDetailComponent implements OnInit {
    offer: Offer;
    user: User;
    public isSubscribed$;

    constructor(
        private profileService: ProfileService,
        private offersService: OffersService,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store,
    ) {
        this.user = this.profileService.user;
        this.route.params.subscribe(params => {
            const offers = this.offersService.offers;

            const offerID = +params.id;
            this.offer = (offers.find(offer => offer.id === offerID) || {}) as Offer;
            this.isSubscribed$ = this.store.pipe(
                select(fromMyOffersReducer.selectIsUserSubscribedTo, {offerId: this.offer.id}),
            );
        });
    }

    subscribeOffer() {
        this.store.dispatch(fromMyOffers.actions.subscribeToOffer({offerId: this.offer.id}));
        this.router.navigate(['/admin/profile']);
    }

    unsubscribeOffer() {
        this.store.dispatch(fromMyOffers.actions.unsubscribeToOffer({offerId: this.offer.id}));
        this.router.navigate(['/admin/profile']);
    }

    ngOnInit() {
    }

    tagsFromOffer() {
        return this.offer.title.map(tags => tags.name).toString();
    }
}
