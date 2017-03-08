import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { UserData } from '../providers/user-data';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(
    platform: Platform,
    public userData: UserData
  ) {

    this.userData.hasLoggedIn().then((hasSeenTutorial) => {

      if (hasSeenTutorial) {
          this.rootPage = TabsPage;
        } else {
          this.rootPage = HomePage;
        }
    });

    platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }
}
