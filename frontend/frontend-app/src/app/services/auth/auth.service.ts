import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import * as auth0 from 'auth0-js';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  auth0 = new auth0.WebAuth({
    clientID: environment.auth.clientID,
    domain: environment.auth.domain,
    responseType: 'token',
    redirectUri: environment.auth.auth0RedirectUri,
    audience: environment.auth.audience,
    scope: 'openid profile'
  });

  // expiresAt: number;
  // userProfile: any;
  // accessToken: string;
  // authenticated: boolean;
  // isUser: boolean;
  // isEmployer: boolean;

  constructor(
    public router: Router
  ) { }

  public login() {
    this.auth0.authorize();
  }

  public handleLoginCallback(): void {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken) {
        window.location.hash = '';
        this.getUserInfo(authResult);
      } else if (err) {
        console.log(`Error: ${err.error}`);
      }
      this.router.navigate(['/']);
    });
  }

  public getAccessToken() {
    return localStorage.getItem("token");
    // this.auth0.checkSession({}, (err, authResult) => {
    //   if (authResult && authResult.accessToken) {
    //     this.getUserInfo(authResult);
    //   }
    // });
  }

  public getUserInfo(authResult) {
    this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
      if (profile) {
        this.setSession(authResult, profile);
      }
    });
  }

  private setSession(authResult, profile): void {
    // this.expiresAt = authResult.expiresIn * 1000 + Date.now();
    // this.accessToken = authResult.accessToken;
    // this.userProfile = profile;
    // this.authenticated = true;
    const expiresAt = moment().add(authResult.expiresIn, 'seconds');

    localStorage.setItem("token", authResult.accessToken);
    localStorage.setItem("expiresAt", JSON.stringify(expiresAt.valueOf()));
  }

  public logout(): void {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    this.auth0.logout({
      returnTo: environment.auth.auth0ReturnTo,
      clientId: environment.auth.clientID
    });
  }

  get isLoggedIn(): boolean {
    // return Date.now() < this.expiresAt && this.authenticated;
    return moment().isBefore(this.getExpiration()) && this.isTokenSet();
  }

  isTokenSet(): boolean {
    const token = this.getAccessToken();    
    return token !== undefined && token !== null && token !== '';
  }

  getExpiration() { // TODO
    const expiration = localStorage.getItem("expiresAt");
    return moment(JSON.parse(expiration));
  }
}
