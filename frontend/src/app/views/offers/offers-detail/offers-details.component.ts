import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Offer } from '../../../shared/models/offer.model';
import { UserApiService } from '../../../shared/services/backend-api/user-api.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-offers-details',
  templateUrl: './offers-details.component.html',
  styleUrls: ['./offers-details.component.scss']
})
export class OffersDetailsComponent implements OnInit {
  public offer: Offer;
  public user: User;

  constructor(private activatedRoute: ActivatedRoute, private userApi: UserApiService, private route: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(((offer: { offer: Offer, user: User }) => {
      this.offer = offer.offer;
      this.user = offer.user;
    }));
  }

  public registerToOffer(offer: Offer): void {
    this.user.offers.push(offer);
    this.userApi.updateUser(this.user).subscribe(user => console.log(user));
    this.route.navigate(['admin', 'offers']);
  }
}
