import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShowProfileComponent } from './show-profile/show-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UserResolver } from '../../shared/resolvers/user.resolver';
import { AuthGuard } from '../../shared/guards/auth.guard';
import { StudentRoleGuard } from '../../shared/guards/student-role.guard';

const routes: Routes = [
  {
    path: '',
    component: ShowProfileComponent,
    resolve: { user: UserResolver },
    canActivate: [AuthGuard, StudentRoleGuard]
  },
  {
    path: 'edit',
    component: EditProfileComponent,
    resolve: { user: UserResolver },
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {
}
