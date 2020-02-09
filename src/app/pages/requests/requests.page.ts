import { Component, OnInit } from '@angular/core';
// import { SettingsService } from '../../services/settings/settings.service';
// import { TabsPage } from '../../pages/tabs/tabs.page';
// import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
@Component({
  selector: 'app-requests',
  templateUrl: './requests.page.html',
  styleUrls: ['./requests.page.scss'],
})
export class RequestsPage implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() {
  }

}
