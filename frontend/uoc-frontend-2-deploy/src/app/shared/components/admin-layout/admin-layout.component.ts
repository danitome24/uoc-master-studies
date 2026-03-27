import { Component } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { HttpClient } from '@angular/common/http';
import { AppSettings } from '../../app.settings';
import { OffersService } from '../../services/offers.service';
import {Store} from '@ngrx/store';
import {actions as SignInActions} from '../../../auth/actions/auth.actions';

@Component({
  selector: 'app-admin-layout',
  styleUrls: ['./admin-layout.component.scss'],
  templateUrl: './admin-layout.template.html'
})
export class AdminLayoutComponent {
  public menus: [
    {
      'name': 'Dashboard',
      'icon': 'dashboard',
      'link': false,
      'open': false,
      'chip': { 'value': 1, 'color': 'accent' },
      'sub': [
        {
          'name': 'Dashboard',
          'link': '/auth/dashboard',
          'icon': 'dashboard',
          'chip': false,
          'open': true,
        }
      ]
    },
  ];

  /* MOCK PURPOSES */
  constructor(
    private profileService: ProfileService,
    private offersService: OffersService,
    private http: HttpClient,
    private store: Store
  ) {
    this.login({ email: 'carlos.caballero@gmail.com', password: '1234' }).then(
      user => {
        this.profileService.user = user;
      }
    );
    this.offersService.getOffers().subscribe(offers => {
      this.offersService.offers = offers;
    });
  }

  getUsers() {
    return this.http.get<any>(AppSettings.API_ENDPOINT_USERS).toPromise();
  }

  async login({ email, password }): Promise<any> {
    const users = await this.getUsers();
    // Mock response from backend:
    return users.find(
      (user: any) => user.email === email && user.password === password
    );
  }

  logout() {
    this.store.dispatch(SignInActions.logout({}));
  }
}
