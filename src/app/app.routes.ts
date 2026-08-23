import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [

  {
  path: 'search-documents',
  loadComponent: () =>
    import('./pages/search-documents/search-documents.page')
      .then(m => m.SearchDocumentsPage),
},
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
    canActivate: [authGuard],
    loadComponent: () =>
      import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login.page').then((m) => m.LoginPage),
  },

  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.page').then((m) => m.RegisterPage),
  },
  {
    path: 'my-documents',
    loadComponent: () => import('./pages/my-documents/my-documents.page').then( m => m.MyDocumentsPage)
  },
  {
    path: 'upload-document',
    loadComponent: () => import('./pages/upload-document/upload-document.page').then( m => m.UploadDocumentPage)
  },
  {
    path: 'search-documents',
    loadComponent: () => import('./pages/search-documents/search-documents.page').then( m => m.SearchDocumentsPage)
  },
  {
    path: 'verify-email',
    loadComponent: () => import('./pages/verify-email/verify-email.page').then( m => m.VerifyEmailPage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  {
  path: 'document-detail/:id',
  loadComponent: () =>
    import('./pages/document-detail/document-detail.page')
      .then(m => m.DocumentDetailPage)
    },
];