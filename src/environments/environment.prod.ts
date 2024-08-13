import { Environment } from './type';

export const environment: Environment = {
  production: true,
  host: 'https://api.lamacare.com.au',
  xeroHost:'https://lamaapi-dot-moveup-304715.uc.r.appspot.com/api/v2/',

  //https://purwh8lf4m.execute-api.ap-southeast-2.amazonaws.com/
  //server: 'http://localhost:4500',
  server: 'https://ssr-back.herokuapp.com',
  name: 'production',
  isDebug: false,
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
  stripeKey: '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',
  productKeyForClientPrice: 'price_1MyTAGEwfgVx7HdnN44e0aO0',
  productKeyForSetupFee: 'price_1My8hFEwfgVx7HdnhwLUnLd3',
  productKeyForSMSCredit: 'price_1My8e2EwfgVx7HdnNCwkEMjT',
  myob:{
    clientID:'8614295686142956',
    myobClientID:'6936d882-2fcd-47c2-8b66-5eb098b9767c'
  }
};

/*
  // old
  firebase: {
    apiKey: "AIzaSyB9QWpOBEhcxNuY4dTkg1w1DdzuDRiI_ZA",
    authDomain: "lamacare.firebaseapp.com",
    projectId: "lamacare",
    storageBucket: "lamacare.appspot.com",
    messagingSenderId: "659501585554",
    appId: "1:659501585554:web:12b105346c73f6c7af424b",
    databaseURL: "https://lamacare.firebaseio.com",
  }
*/

/*
  // new
  const firebaseConfig = {
    apiKey: "AIzaSyDTfd1naygcRIwMhnSyAgED0nIJXiEkvSE",
    authDomain: "lamacare-353813.firebaseapp.com",
    projectId: "lamacare-353813",
    storageBucket: "lamacare-353813.appspot.com",
    messagingSenderId: "620150107033",
    appId: "1:620150107033:web:7d779901b996afa8634108"
  };
*/
