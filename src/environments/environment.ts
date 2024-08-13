// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { Environment } from './type';

export const environment: Environment = {
  production: false,
  server: 'http://localhost:8843',
  //server: 'https://ssr-back.herokuapp.com',
  //host: 'http://167.71.222.129',
  //host: 'http://13.237.148.169:5000/Stage',
  host: 'https://lamacare.dev.politetech.com',
  // host: 'http://192.168.1.22:5000',
  // host: 'https://api.lamacare.com.au',
  xeroHost:'https://lamaapi-dot-moveup-304715.uc.r.appspot.com/api/v2/',
  name: 'development',
  NgRxName: 'App devtools',
  NgRxMaxAge: 15,
  isDebug: true,
  firebase: {
    apiKey: "AIzaSyC5dzlK1lXyrRh4PaC_cUv6Pr4gw0gOgX0",
    authDomain: "lamacare-mobile.firebaseapp.com",
    projectId: "lamacare-mobile",
    storageBucket: "lamacare-mobile.appspot.com",
    messagingSenderId: "1024676668055",
    appId: "1:1024676668055:web:9a23e722bda340bfaa7fd2",
    databaseURL: "https://lamacare.firebaseio.com",
  },
  googleAPIKey: {
    apiKey: 'AIzaSyC5dzlK1lXyrRh4PaC_cUv6Pr4gw0gOgX0',
    clientId: '1024676668055-64bkasnpbhd7hbobfc95ip64a2qd5tkt.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/places https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.settings.readonly https://www.googleapis.com/auth/calendar.addons.execute https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.calendars https://www.googleapis.com/auth/calendar.calendars.readonly https://www.googleapis.com/auth/calendar.settings https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.settings.readonly https://www.googleapis.com/auth/calendar.addons.execute https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar.calendars https://www.googleapis.com/auth/calendar.calendars.readonly https://www.googleapis.com/auth/calendar.settings https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.events.readonly https://www.googleapis.com/auth/calendar'
  },
  stripeKey: 'sk_test_51MxmQwEwfgVx7HdnmfsAoZK7I4w8zIMwt9U5LrpLJTGN36VobcIGyTByImBJCxdLaSSBp8nc6ZMmOUHrXNoKrEXN00FcFCtsBM',
  productKeyForClientPrice: 'price_1My8g7EwfgVx7HdnYajAapfF',
  productKeyForSetupFee: 'price_1OPtuqEwfgVx7HdntaMc0MoQ',
  productKeyForSMSCredit: 'price_1My8e2EwfgVx7HdnNCwkEMjT',
  myob:{
    clientID:'8614295686142956',
    myobClientID:'6936d882-2fcd-47c2-8b66-5eb098b9767c'
  }
  /*stripeKey: 'sk_test_51MvVy8GyeyaHHRTVqv919Ykqg0eZ3gfKO4QdEIIJzvrLEPjD8WNv7Ngm5Fw3UIiAAHjATCWD63RgDKOZJaj50hyr00fFc9Ekrq',
  productKeyForClientPrice: 'price_1MvutOGyeyaHHRTVRSVs3zHa',
  productKeyForSetupFee: 'price_1Mw14OGyeyaHHRTVCQnZsaw2',
  productKeyForSMSCredit: 'price_1MvuxJGyeyaHHRTVFtRzEdad',*/
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
