import { Component, OnInit } from '@angular/core';
import { User } from '../../../shared/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-my-job',
  templateUrl: './my-job.component.html',
  styleUrls: ['./my-job.component.scss']
})
export class MyJobComponent implements OnInit {
  public user: User;

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(((user: { user: User }) => {
      this.user = user.user;
    }));
  }
}
