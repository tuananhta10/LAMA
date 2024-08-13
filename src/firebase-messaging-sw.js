importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.7/firebase-messaging-compat.js');

var broadcast = new BroadcastChannel('myAppChannel');

self.addEventListener('notificationclick', function(event) {
    var action_click = event.notification.data.url;
    event.notification.close();
    event.waitUntil(
      clients.openWindow(action_click)
    );
  });
  
self.addEventListener('push', function(event) {
    var data = {};
    if (event.data) {
        data = event.data.json();
    }
    event.stopImmediatePropagation();
    broadcast.postMessage(data.notification)
    showNotification(data.notification);
});

function showNotification(notification) {
    var click_action = notification.click_action; //<-- This is correct!
    var options = {
        body: notification.body,
        icon: notification.icon,
        subtitle: notification.subtitle,
        data: {
            url: click_action
        }
    };
    if (self.registration.showNotification) {
        return self.registration.showNotification(notification.title, options);
    }
  }

var config = {
    apiKey: "AIzaSyB9QWpOBEhcxNuY4dTkg1w1DdzuDRiI_ZA",
    authDomain: "lamacare.firebaseapp.com",
    projectId: "lamacare",
    storageBucket: "lamacare.appspot.com",
    messagingSenderId: "659501585554",
    appId: "1:659501585554:web:12b105346c73f6c7af424b",
    databaseURL: "https://lamacare.firebaseio.com",
};

firebase.initializeApp(config);

var messaging = firebase.messaging();