import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { AuthServiceProvider } from '../../services/user/auth.service';
import { BooksService } from '../../services/books/books.service';
import { ProfileService } from '../../services/user/profile.service';
import { ReturnService } from '../../services/return/return.service';
import { ActivatedRoute } from '@angular/router'
@Component({
  selector: 'app-borbks-detail',
  templateUrl: './borbks-detail.page.html',
  styleUrls: ['./borbks-detail.page.scss'],
})
export class BorbksDetailPage implements OnInit {
  uid = null;
  date = null;
  od = null;
  day = null;
  userBooks$;
  filteredusers = [];
  constructor(public auth: AuthServiceProvider, public bs: BooksService,public userservice: ProfileService, public ret: ReturnService,public activatedRoute: ActivatedRoute) {
    this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
     })
   }

  ngOnInit() {
    this.userBooks$ = this.bs.getLibBooks();
    this.uid = this.activatedRoute.snapshot.paramMap.get('id');
    firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase
        .firestore()
        .doc(`/books/${this.uid}`)
        .get()
        .then(userProfileSnapshot => {
          this.date = userProfileSnapshot.data().date;
          this.dte();
        });
    }
   });
  }
  rate(){
    alert('Please Rate the Book')
  }
  dte(){
      this.date = this.date.toDate();
      this.date.setDate(this.date.getDate() + 7);
      this.od = JSON.stringify(this.date);
      this.od = this.od.slice(1,11)
  }

}
