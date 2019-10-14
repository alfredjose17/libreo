
import { SettingsService } from '../../services/settings/settings.service';
import { TabsPage } from '../../pages/tabs/tabs.page';
import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {
  selectedTheme: String;
  isappver: string;
    isLoggedIn$: Observable<boolean>;
    constructor(private appVersion: AppVersion,public navCtrl: NavController, private settings: SettingsService, public tabs: TabsPage) {
      this.isLoggedIn$ = this.tabs.isLoggedIn$;
      this.settings.getActiveTheme().subscribe(val => this.selectedTheme = val);
      this.appVersion.getVersionNumber().then(
        (versionNumber) => {
          this.isappver = versionNumber;
        },
        (error) => {
          console.log(error);
        });
    }


    logOut(): void {
      this.tabs.logOut()
    }

  }
