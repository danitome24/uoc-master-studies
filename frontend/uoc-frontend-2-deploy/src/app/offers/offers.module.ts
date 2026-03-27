import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {OffersRoutingModule} from './offers-routing.module';
import {OffersComponent} from './offers.component';
import {OffersDetailComponent} from './offers-detail/offers-detail.component';
import {OffersListComponent} from './offers-list/offers-list.component';
import {OffersProfileComponent} from './offers-profile/offers-profile.component';
import {AuthModule} from '../auth/auth.module';
import {MaterialModule} from '../shared/material.module';

@NgModule({
    declarations: [
        OffersComponent,
        OffersProfileComponent,
        OffersListComponent,
        OffersDetailComponent
    ],
    imports: [CommonModule, OffersRoutingModule, AuthModule, MaterialModule]
})
export class OffersModule {
}
