import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ConfigurationComponent} from './configuration.component';
//import { CompanyRoleGuard } from '../../shared/guards/company-role.guard';

const routes: Routes = [{
    path: '',
    component: ConfigurationComponent,
    //canActivate: [CompanyRoleGuard]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ConfigurationRoutingModule {
}
