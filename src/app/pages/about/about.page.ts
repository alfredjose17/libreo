import { Component, OnInit } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { AppUpdate } from '@ionic-native/app-update/ngx';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {
  isappver: string;
  constructor(private appVersion: AppVersion,
  private appUpdate: AppUpdate,) { }

  ngOnInit() {
    this.appVersion.getVersionNumber().then(
      (versionNumber) => {
        this.isappver = versionNumber;
      },
      (error) => {
        console.log(error);
      });
  }
  check_update(){
    const updateUrl = 'https://cristomathew.000webhostapp.com/update.xml';
      this.appUpdate.checkAppUpdate(updateUrl).then(update => {
        alert(update.msg);
      }).catch(error=>{
        alert("Error: "+error.msg);
      });
  }


}
