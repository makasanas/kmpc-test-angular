import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PublicComponent } from './public/public.component';
import { SecureComponent } from './secure/secure.component';
import { LoginComponent } from './public/login/login.component';
import { DashboardComponent } from './secure/dashboard/dashboard.component';
import { AuthGuardForLoggedIn } from './services/auth-guard-for-logged-in.service';
import { AuthGuardService } from './services/auth-guard-service.service';
import { SocialLoginComponent } from './public/social-login/social-login.component';
import { SocialLoginModule, AuthServiceConfig, GoogleLoginProvider, FacebookLoginProvider, } from "angular-6-social-login";
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './common/header/header.component';

export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
    [
      // {
      //   id: FacebookLoginProvider.PROVIDER_ID,
      //   provider: new FacebookLoginProvider("315027562531312")
      // },
      {
        id: GoogleLoginProvider.PROVIDER_ID,
        provider: new GoogleLoginProvider("842631107796-a8tponck79pkq8ncq0j452ftgko093t9.apps.googleusercontent.com")
      }
    ]);
  return config;
}

@NgModule({
  declarations: [
    AppComponent,
    PublicComponent,
    SecureComponent,
    LoginComponent,
    DashboardComponent,
    SocialLoginComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocialLoginModule
  ],
  providers: [
    AuthGuardForLoggedIn,
    AuthGuardService, {
      provide: AuthServiceConfig,
      useFactory: getAuthServiceConfigs
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
