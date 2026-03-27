import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../../models/offer.model';
import { AppSettings } from '../../app.settings';
import { User } from '../../models/user.model';
import { filter, flatMap, map } from 'rxjs/operators';
import { VocationalStudy } from '../../models/study.model';

@Injectable()
export class OffersApiService {
  constructor(private http: HttpClient) {
  }

  public getOffersForUserStudies(user: User): Observable<Offer[]> {
    return this.http.get <Offer[]>(AppSettings.API_ENDPOINT_OFFERS).pipe(
      map(offers => offers.filter(offer => user.studies.find(study => {
        if (study.hasOwnProperty('category')) {
          const vocationalStudy = study as VocationalStudy;
          return offer.category.name.toString() === vocationalStudy.category.name;
        }
        return offer.category.name.toString() === study.title;
      })))
    );
  }

  public getOffer(offerId: number): Observable<Offer> {
    return this.http.get<Offer[]>(AppSettings.API_ENDPOINT_OFFERS).pipe(
      flatMap((response) => response),
      filter(offer => offer.id === offerId)
    );
  }
}
