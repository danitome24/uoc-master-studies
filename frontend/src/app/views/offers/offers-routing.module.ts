import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OffersComponent } from './offers/offers.component';
import { UserResolver } from '../../shared/resolvers/user.resolver';
import { OffersDetailsComponent } from './offers-detail/offers-details.component';
import { OfferResolver } from '../../shared/resolvers/offer.resolver';
import { MyJobComponent } from './my-job/my-job.component';
import { MyJobDetailComponent } from './my-job-detail/my-job-detail.component';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { StudentRoleGuard } from '../../shared/guards/student-role.guard';

const routes: Routes = [
  {
    path: '',
    component: OffersComponent,
    resolve: { user: UserResolver },
    canActivate: [AuthGuard, StudentRoleGuard]
  },
  {
    path: 'detail',
    component: OffersDetailsComponent,
    resolve: { offer: OfferResolver, user: UserResolver },
    canActivate: [AuthGuard, StudentRoleGuard]
  },
  {
    path: 'my-job',
    component: MyJobComponent,
    resolve: { user: UserResolver },
    canActivate: [AuthGuard, StudentRoleGuard]
  },
  {
    path: 'my-job/:id/detail',
    component: MyJobDetailComponent,
    resolve: { offer: OfferResolver, user: UserResolver },
    canActivate: [AuthGuard, StudentRoleGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OffersRoutingModule {
}
