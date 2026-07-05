import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full',
  },

  {
    path: 'welcome',
    loadComponent: () =>
      import('./pages/welcome/welcome.page').then((m) => m.WelcomePage),
  },

  {
    path: 'home',
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },

];
