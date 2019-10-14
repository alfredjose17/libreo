import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceProvider } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isLoggedIn$: Observable<boolean>;
  isAdmin = null;
  name = null;
  iscs = null;
  constructor(private authService: AuthServiceProvider, private router: Router) {

       }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase
        .firestore()
        .doc(`/users/${user.uid}`)
        .get()
        .then(userProfileSnapshot => {
          this.isAdmin = userProfileSnapshot.data().usertype;
          this.name = userProfileSnapshot.data().displayName;
          this.iscs = userProfileSnapshot.data().cs;
        });
    }
  });
  }
  doRefresh(event) {
    console.log('Begin async operation');
    this.ngOnInit();
    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


}
