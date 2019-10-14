import { Component } from '@angular/core';
import { SettingsService } from './services/settings/settings.service';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  selectedTheme: String;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private appUpdate: AppUpdate,
    private settings: SettingsService
  ) {
    this.initializeApp();
    this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
    console.log(this.selectedTheme)

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      const updateUrl = 'https://cristomathew.000webhostapp.com/update.xml';
        this.appUpdate.checkAppUpdate(updateUrl).then(update => {
        }).catch(error=>{
          alert("Error: "+error.msg);
        });




    });
  }
}
