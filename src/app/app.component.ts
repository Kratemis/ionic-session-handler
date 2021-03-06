import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { SessionProvider } from '../providers/session/session';
import { Storage } from '@ionic/storage';
import { HomePage } from '../pages/home/home';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{ title: string, component: any }>;

  private data: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public sessionService: SessionProvider, private storage: Storage ) {
    this.initializeApp();
    this.storage.get('accessToken').then((accessToken) => {
      console.log(accessToken);
      this.sessionService.hasValidIdToken(accessToken).subscribe(response => {
        this.data = response;
        console.log(this.data.data[0]);
        if(this.data.data[0] != 'TOKEN_OK')
        {
          this.rootPage = LoginPage;
          this.nav.popToRoot();
        }else{
          this.rootPage = HomePage;
          this.nav.popToRoot();
        }
      });
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
