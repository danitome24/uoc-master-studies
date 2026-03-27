import { Component } from '@angular/core';
import { ProfileService } from 'src/app/shared/services/profile.service';
import { SigninService } from '../../auth/signin/signin.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {
  constructor() {}
}
