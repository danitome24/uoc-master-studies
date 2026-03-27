import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// SERVICES
import { AppConfirmService } from './services/app-confirm/app-confirm.service';
import { AppComfirmComponent } from './services/app-confirm/app-confirm.component';
import { AuthGuard } from './guards/auth.guard';
import { StudentRoleGuard } from './guards/student-role.guard';
import { CompanyRoleGuard } from './guards/company-role.guard';
/*
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar'; */

// COMPONENTS

// DIRECTIVES

// PIPES

const classesToInclude = [AppComfirmComponent];

@NgModule({
  imports: [CommonModule, FormsModule, RouterModule],

  providers: [AppConfirmService, AuthGuard, StudentRoleGuard, CompanyRoleGuard],
  entryComponents: [AppComfirmComponent],
  declarations: classesToInclude,
  exports: classesToInclude
})
export class SharedModule {}
