import { Component, OnInit } from '@angular/core';
import { UserStoreService } from '../../shared/services/user-store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public userStoreService: UserStoreService) { }

  ngOnInit() {
  }

}
