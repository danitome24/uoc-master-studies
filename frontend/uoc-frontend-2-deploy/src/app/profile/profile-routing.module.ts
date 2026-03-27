import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { ProfileStudyComponent } from './profile-student/study/profile-study.component';
import { ProfileLanguageComponent } from './profile-student/language/profile-language.component';
import { ProfileAccountComponent } from './profile-student/account/profile-account.component';
import {WorkExperienceComponent} from './profile-student/work-experience/work-experience.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent
  },
  {
    path: 'profile-student/work-experience',
    component: WorkExperienceComponent
  },
  {
    path: 'profile-student/work-experience/:uid',
    component: WorkExperienceComponent
  },
  {
    path: 'profile-student/account',
    component: ProfileAccountComponent
  },
  {
    path: 'profile-student/study',
    component: ProfileStudyComponent
  },
  {
    path: 'profile-student/study/:uid',
    component: ProfileStudyComponent
  },
  {
    path: 'profile-student/language',
    component: ProfileLanguageComponent
  },
  {
    path: 'profile-student/language/:uid',
    component: ProfileLanguageComponent
  },
  {
    path: 'config',
    loadChildren: () =>
        import('./configuration/configuration.module').then(m => m.ConfigurationModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule {}
