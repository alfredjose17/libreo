import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController, NavController, NavParams } from '@ionic/angular';
import { AuthServiceProvider } from '../../services/user/auth.service';
import { usercreds } from '../../models/interfaces/usercreds';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  credentials = {} as usercreds;
  constructor(private navCtrl: NavController, public authservice: AuthServiceProvider, private router: Router) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  signin() {
    this.authservice.login(this.credentials).then((res: any) => {
      if (!res.code)
        this.router.navigateByUrl('/tabs/home');
      else
        alert('user name or password wrong');

    })
  }
  signup(){
    this.navCtrl.navigateRoot('tabs/signup');
  }



}
