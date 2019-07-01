import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { PUBLIC_ROUTES } from './public/public.route';
import { SECURE_ROUTES } from './secure/secure.route';
import { AuthGuardForLoggedIn } from './services/auth-guard-for-logged-in.service';
import { AuthGuardService } from './services/auth-guard-service.service';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full', },
  {
    path: '', component: PublicComponent,
    canActivate: [AuthGuardForLoggedIn],
    data: { title: 'Public Views' }, children: PUBLIC_ROUTES
  },
  {
    path: '', component: SecureComponent,
    canActivate: [AuthGuardService],
    data: { title: 'Secure Views' }, children: SECURE_ROUTES
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
