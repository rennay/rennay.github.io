import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    },
    {
      title: 'Latest',
      url: '/homer-detail/latest/0',
      icon: 'pulse'
    },
    {
      title: 'Customers Live',
      url: '/homer-list/customers/live/10',
      icon: 'person'
    },
    {
      title: 'Accounts Live',
      url: '/homer-list/accounts/live/10',
      icon: 'card'
    },
    {
      title: 'Customers Sandbox',
      url: '/homer-list/customers/sandbox/10',
      icon: 'person'
    },
    {
      title: 'Accounts Sandbox',
      url: '/homer-list/accounts/sandbox/10',
      icon: 'card'
    },
    {
      title: 'Search',
      url: '/homer-search',
      icon: 'search'
    },
    {
      title: 'Wakanda Identity',
      url: '/wakanda-identity',
      icon: 'person'
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
