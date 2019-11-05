import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../services/user/auth.service';
import { NavController, AlertController, ToastController, LoadingController  } from '@ionic/angular';

import { Router } from '@angular/router';
import { HttpClient } from  '@angular/common/http';
import { Observable } from  'rxjs';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {newuser = {
    email: '',
    password: '',
    displayName: '',
    usertype: '',
    libraryid: '',
    librarianid: '',
    libraryname: '',
    cs: '',
  }
  m = '0';
  k = '0';
  public loading: any;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    private authService: AuthServiceProvider,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    private router: Router,

  ) {
  }

  ngOnInit() {}

  async joinUser(): Promise<void> {
    var toaster = await this.toastCtrl.create({
      message: 'All fields are required dude',
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '' || this.newuser.displayName == '' || this.newuser.usertype == '') {
      await toaster.present();
    }
    else {
      if (this.newuser.usertype == 'Librarian') {
        this.newuser.cs = '1'
      }
      if (this.newuser.usertype == 'Client') {
        this.newuser.cs = this.m
      }
      this.authService.joinUser(this.newuser).then(
        () => {
          this.loading.dismiss().then(() => {
            this.router.navigateByUrl('/tabs/login');
          });
        },
        error => {
          this.loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }]
            });
            await alert.present();
          });
        }
      );
      this.loading = await this.loadingCtrl.create();
      await this.loading.present();
    }
  }
  goback(){
    this.navCtrl.navigateRoot('tabs/login');
  }
  term(){
    this.navCtrl.navigateRoot('tabs/temsandconditions');
  }
  check(){
    this.k = '1';
  }
}
