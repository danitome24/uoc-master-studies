import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {StatsCardComponent} from './stats-card.component';
import {MaterialModule} from '../../shared/material.module';

@NgModule({
    declarations: [StatsCardComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [StatsCardComponent]
})
export class StatsCardModule {}
