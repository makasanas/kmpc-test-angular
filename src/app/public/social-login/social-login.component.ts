import { Component, OnInit } from '@angular/core';
import { AuthService, FacebookLoginProvider, GoogleLoginProvider } from 'angular-6-social-login';
import { SocialLoginService } from './social-login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-social-login',
  templateUrl: './social-login.component.html',
  styleUrls: ['./social-login.component.scss']
})
export class SocialLoginComponent implements OnInit {

  constructor(
    private socialAuthService: AuthService,
    private _socialSignupService: SocialLoginService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  public socialSignIn(socialPlatform: string) {
    console.log("immm sociallllll")
    let socialPlatformProvider;
    if (socialPlatform == "facebook") {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform == "google") {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }

    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(socialPlatform + " sign in data : ", userData);
        // localStorage.setItem('token', userData.token);
        localStorage.setItem('userName', userData.name);
        this._router.navigateByUrl('/dashboard');
        let user = {
          firstName: userData.name,
          lastName: userData.name,
          email: userData.email,
          socialId: userData.id,
          phoneNumber: userData['phone'] ? userData['phone'] : '',
          gender: userData['gender'] ? userData['gender'] : '',
          image: userData.image

        }
        this._socialSignupService.socialsignup(user).subscribe((res) => {
          console.log(res);
          localStorage.setItem('token', res.token);
          // localStorage.setItem('userRole', res.data.role);
          this._router.navigateByUrl('/dashboard');
        }, err => {
          console.log(err);
        });

      }
    );
  }
}
