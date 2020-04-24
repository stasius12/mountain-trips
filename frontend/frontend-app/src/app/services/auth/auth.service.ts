import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import createAuth0Client from '@auth0/auth0-spa-js';
import Auth0Client from '@auth0/auth0-spa-js/dist/typings/Auth0Client';
import { from, of, Observable, BehaviorSubject, combineLatest, throwError } from 'rxjs';
import { tap, catchError, concatMap, shareReplay } from 'rxjs/operators';

import * as auth0 from 'auth0-js';
import * as moment from 'moment';

import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth0Client$ = (from(
    createAuth0Client({
      domain: environment.auth.domain,
      audience: environment.auth.audience,
      client_id: environment.auth.clientID,
      redirect_uri: environment.auth.auth0RedirectUri,
    })
  ) as Observable<Auth0Client>).pipe(
    shareReplay(1),
    catchError(err => throwError(err))
  );

  isAuthenticated$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.isAuthenticated())),
    tap(res => this.loggedIn = res)
  );

  handleRedirectCallback$ = this.auth0Client$.pipe(
    concatMap((client: Auth0Client) => from(client.handleRedirectCallback()))
  );

  private userProfileSubject$ = new BehaviorSubject<any>(null);
  userProfile$ = this.userProfileSubject$.asObservable();

  loggedIn: boolean = null;

  constructor(private router: Router) {
    this.localAuthSetup();
    this.handleAuthCallback();
  }

  getUser$(options?): Observable<any> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getUser(options))),
      tap(user => this.userProfileSubject$.next(user))
    );
  }

  private localAuthSetup() {
    const checkAuth$ = this.isAuthenticated$.pipe(
      concatMap((loggedIn: boolean) => {
        if (loggedIn) {
          return this.getUser$();
        }
        return of(loggedIn);
      })
    );
    checkAuth$.subscribe();
  }

  login(redirectPath: string = '/') {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.loginWithRedirect({
        redirect_uri: environment.auth.auth0RedirectUri,
        appState: { target: redirectPath }
      });
    });
  }

  private handleAuthCallback() {
    const params = window.location.search;
    if (params.includes('code=') && params.includes('state=')) {
      let targetRoute: string;
      const authComplete$ = this.handleRedirectCallback$.pipe(
        tap(cbRes => {
          targetRoute = cbRes.appState && cbRes.appState.target 
            ? cbRes.appState.target
            : '/';
        }),
        concatMap(() => {
          return combineLatest([
            this.getUser$(),
            this.isAuthenticated$
          ]);
        })
      );

      authComplete$.subscribe(([user, loggedIn]) => {
        this.router.navigate([targetRoute]);
      })
    }
  }

  logout() {
    this.auth0Client$.subscribe((client: Auth0Client) => {
      client.logout({
        client_id: environment.auth.clientID,
        returnTo: environment.auth.auth0ReturnTo
      })
    })
  }

  getTokenSilently$(options?): Observable<string> {
    return this.auth0Client$.pipe(
      concatMap((client: Auth0Client) => from(client.getTokenSilently(options)))
    );
  }

  // auth0 = new auth0.WebAuth({
  //   clientID: environment.auth.clientID,
  //   domain: environment.auth.domain,
  //   responseType: 'token',
  //   redirectUri: environment.auth.auth0RedirectUri,
  //   audience: environment.auth.audience,
  //   scope: 'openid profile'
  // });

  // constructor(
  //   public router: Router
  // ) { }

  // public login() {
  //   this.auth0.authorize();
  // }

  // public handleLoginCallback(): void {
  //   this.auth0.parseHash((err, authResult) => {
  //     if (authResult && authResult.accessToken) {
  //       window.location.hash = '';
  //       this.getUserInfo(authResult);
  //     } else if (err) {
  //       console.log(`Error: ${err.error}`);
  //     }
  //     this.router.navigate(['/']);
  //   });
  // }

  // public getAccessToken() {
  //   return localStorage.getItem("token");
  // }

  // public getUserInfo(authResult) {
  //   this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
  //     if (profile) {
  //       this.setSession(authResult, profile);
  //     }
  //   });
  // }

  // private setSession(authResult, profile): void {
  //   const expiresAt = moment().add(authResult.expiresIn, 'seconds');

  //   localStorage.setItem("token", authResult.accessToken);
  //   localStorage.setItem("expiresAt", JSON.stringify(expiresAt.valueOf()));
  // }

  // public logout(): void {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("expiresAt");
  //   this.auth0.logout({
  //     returnTo: environment.auth.auth0ReturnTo,
  //     clientId: environment.auth.clientID
  //   });
  // }

  // get isLoggedIn(): boolean {
  //   // return Date.now() < this.expiresAt && this.authenticated;
  //   return moment().isBefore(this.getExpiration()) && this.isTokenSet();
  // }

  // isTokenSet(): boolean {
  //   const token = this.getAccessToken();    
  //   return token !== undefined && token !== null && token !== '';
  // }

  // getExpiration() { // TODO
  //   const expiration = localStorage.getItem("expiresAt");
  //   return moment(JSON.parse(expiration));
  // }
}
