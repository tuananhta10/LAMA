import { Environment } from './type';

export const environment: Environment = {
  production: false,
  // temporary changed the server to test sample authentication
  //server: 'https://staging.lamacare.com.au',
  server: 'https://ssr-back.herokuapp.com',
  host: 'https://lamacare.dev.politetech.com',
  xeroHost:'https://lamaapi-dot-moveup-304715.uc.r.appspot.com/api/v2/',
  name: 'staging',
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
    scope: 'https://www.googleapis.com/auth/calendar https://www.googleapis.com/auth/places'
  },
  stripeKey: 'sk_test_51MxmQwEwfgVx7HdnmfsAoZK7I4w8zIMwt9U5LrpLJTGN36VobcIGyTByImBJCxdLaSSBp8nc6ZMmOUHrXNoKrEXN00FcFCtsBM',
  productKeyForClientPrice: 'price_1My8g7EwfgVx7HdnYajAapfF',
  productKeyForSetupFee: 'price_1My8hFEwfgVx7HdnhwLUnLd3',
  productKeyForSMSCredit: 'price_1My8e2EwfgVx7HdnNCwkEMjT',
  myob:{
    clientID:'8614295686142956',
    myobClientID:'6936d882-2fcd-47c2-8b66-5eb098b9767c'
  }

};
