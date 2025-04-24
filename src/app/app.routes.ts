import { Routes } from '@angular/router';
import { LoginComponent } from './account/login/login.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './account/register/register.component';
import { ConfirmEmailComponent } from './account/confirm-email/confirm-email.component';
import { ResetPasswordStep1Component } from './account/reset-password-step-1/reset-password-step-1.component';
import { ResetPasswordStep2Component } from './account/reset-password-step-2/reset-password-step-2.component';
import { AccountLayoutComponent } from './shared/layouts/account-layout/account-layout.component';
import { UserLayoutComponent } from './shared/layouts/user-layout/user-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'account',
    component: AccountLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'confirm-email',
        component: ConfirmEmailComponent,
      },
      {
        path: 'forgot-password',
        component: ResetPasswordStep1Component,
      },
      {
        path: 'reset-password',
        component: ResetPasswordStep2Component,
      },
    ],
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];
