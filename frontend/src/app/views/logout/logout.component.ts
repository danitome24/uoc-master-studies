import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../shared/services/user-store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(private userStore: UserStoreService, private router: Router) {
  }

  ngOnInit() {
    this.userStore.logout();
    this.router.navigate(['signin']);
  }
}
