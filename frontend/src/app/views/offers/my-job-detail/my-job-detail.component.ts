import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/user.model';
import { Offer } from '../../../shared/models/offer.model';
import { UserApiService } from '../../../shared/services/backend-api/user-api.service';

@Component({
  selector: 'app-my-job-detail',
  templateUrl: './my-job-detail.component.html',
  styleUrls: ['./my-job-detail.component.scss']
})
export class MyJobDetailComponent implements OnInit {
  public user: User;
  public offer: Offer;

  constructor(private activatedRoute: ActivatedRoute, private userApi: UserApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(((user: { offer: Offer, user: User }) => {
      this.user = user.user;
      this.offer = user.offer;
    }));
  }

  removeRegisteredToOffer(offer: Offer) {
    this.user.offers = this.user.offers.filter(offerRegistered => offer.id !== offerRegistered.id);
    this.userApi.updateUser(this.user).subscribe(user => console.log(user));
    this.router.navigate(['admin', 'offers', 'my-job']);
  }
}
