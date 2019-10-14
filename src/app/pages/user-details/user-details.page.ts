import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {  NavController, AlertController } from '@ionic/angular';
import { connreq } from '../../models/interfaces/request';
import { ProfileService } from '../../services/user/profile.service';

import { BooksService } from '../../services/books/books.service';
import { BorrowService } from '../../services/borrow/borrow.service';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { RequestsProvider } from '../../providers/requests/requests';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.page.html',
  styleUrls: ['./user-details.page.scss'],
})
export class UserDetailsPage implements OnInit {
  uid = null;
  isAdmin = null;
  filteredusers = [];
  userBooks$;
  newrequest = {} as connreq;
  constructor(private activatedRoute: ActivatedRoute,
              public bookservice: BooksService,
              public borrow: BorrowService,
              public navCtrl: NavController,
              public alertCtrl: AlertController,
              public requestservice: RequestsProvider,
              public userservice: ProfileService) {
                  this.userBooks$ = this.bookservice.getLibBooks();
                }

  ngOnInit() {
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    this.userservice.getallusers().then((res: any) => {
      this.filteredusers = res;
   });
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
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }


}
