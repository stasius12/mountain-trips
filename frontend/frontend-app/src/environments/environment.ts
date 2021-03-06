// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  auth: {
    clientID: 'zV61crhZr78fpCSj8ROPJE2XVdyPIVCp',
    domain: 'mountain-trips.eu.auth0.com',
    audience: 'https://mountain-trips.eu.auth0.com/api/v2/',
    auth0RedirectUri: 'http://localhost:4200/',
    auth0ReturnTo: 'http://localhost:4200/',
    scope: 'openid profile'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
