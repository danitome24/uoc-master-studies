import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ConfigurationRoutingModule} from './configuration-routing.module';
import {ConfigurationComponent} from './configuration.component';
import {MaterialModule} from '../../shared/material.module';


@NgModule({
    declarations: [ConfigurationComponent],
    imports: [
        CommonModule,
        ConfigurationRoutingModule,
        MaterialModule
    ]
})
export class ConfigurationModule {
}
