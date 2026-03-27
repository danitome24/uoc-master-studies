import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { UserStoreService } from '../../../shared/services/user-store';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './show-profile.component.html',
  styleUrls: ['./show-profile.component.scss']
})
export class ShowProfileComponent implements OnInit {

  public user: User;

  constructor(private activedRoute: ActivatedRoute, public userStore: UserStoreService) {
  }

  ngOnInit(): void {
    this.activedRoute.data.subscribe(((user: { user: User }) => {
      this.user = user.user;
    }));
  }

}
