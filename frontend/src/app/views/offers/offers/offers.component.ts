import { Component, OnInit } from '@angular/core';
import { OffersApiService } from '../../../shared/services/backend-api/offers-api.service';
import { Offer } from '../../../shared/models/offer.model';
import { UserStoreService } from '../../../shared/services/user-store';
import { User } from '../../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.scss']
})
export class OffersComponent implements OnInit {
  public offers: Offer[] = [];
  public user: User;

  constructor(private offersApi: OffersApiService, private userStore: UserStoreService,
              private activedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.findUser();
  }

  // Data Methods
  private findUser(): void {
    this.activedRoute.data.subscribe(((user: { user: User }) => {
      this.user = user.user;
      this.offersByUser();
    }));
  }

  private offersByUser(): void {
    this.offersApi.getOffersForUserStudies(this.user)
      .subscribe(offers => {
        this.offers = offers;
      });
  }
}
