import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
/*
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'; */

// COMPONENTS
import { AppComfirmComponent } from './services/app-confirm/app-confirm.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';

// DIRECTIVES

// PIPES

// SERVICES
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import {AuthGuard} from './guards/auth.guard';
import {MaterialModule} from './material.module';

const declarations = [AppComfirmComponent, AdminLayoutComponent];
const sharedExports = [
  CommonModule,
  FormsModule,
  ReactiveFormsModule,
  RouterModule,
  AppComfirmComponent,
  AdminLayoutComponent
];
const providers = [AppConfirmService, AuthGuard];

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule, ReactiveFormsModule, RouterModule],
  entryComponents: [AppComfirmComponent],
  providers,
  declarations,
  exports: sharedExports
})
export class SharedModule {}
