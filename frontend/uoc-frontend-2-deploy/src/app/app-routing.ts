import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { Routes } from '@angular/router';
import {AuthGuard} from './shared/guards/auth.guard';

export const rootRouterConfig: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then(m => m.AuthModule),
    data: { title: 'Auth' }
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./views/dashboard/dashboard.module').then(
            m => m.DashboardModule
          ),

        data: { title: 'Dashboard', breadcrumb: 'DASHBOARD' }
      },
      {
        path: 'profile',
        loadChildren: () =>
          import('./profile/profile.module').then(m => m.ProfileModule),
        data: { title: 'Profile', breadcrumb: 'PROFILE' }
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./views/favorites/favorites.module').then(
            m => m.FavoritesModule
          ),

        data: { title: 'Favorites', breadcrumb: 'FAVORITES' }
      },
      {
        path: 'offers',
        loadChildren: () =>
          import('./offers/offers.module').then(m => m.OffersModule),
        data: { title: 'Offers', breadcrumb: 'Offers' }
      }
    ]
  },
  {
    path: '**',
    redirectTo: 'sessions/404'
  }
];
