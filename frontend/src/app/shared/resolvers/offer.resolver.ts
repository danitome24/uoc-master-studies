import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Offer } from '../models/offer.model';
import { OffersApiService } from '../services/backend-api/offers-api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class OfferResolver implements Resolve<Offer> {
  constructor(private offersApi: OffersApiService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Offer> | Promise<Offer> | Offer {
    const offerId = +route.paramMap.get('id');

    return this.offersApi.getOffer(1);
  }
}
