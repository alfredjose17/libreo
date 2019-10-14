import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthServiceProvider } from '../../services/user/auth.service';
import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {isLoggedIn$: Observable<boolean>;
  isAdmin = null;
  constructor(private authService: AuthServiceProvider, private router: Router) { }

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
        });
    }
  });
  }
  logOut(): void {
    this.authService.logoutUser().then(() => {
      this.router.navigateByUrl('tabs/login');
    });
  }

}
