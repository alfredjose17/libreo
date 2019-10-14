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
enum COLORS {
  GREY = "#E0E0E0",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.page.html',
  styleUrls: ['./book-detail.page.scss'],
})
export class BookDetailPage implements OnInit {
  uid = null;
  isAdmin = null;
  n = null;
  m=0;
  k=0;
  norate;
  filteredusers = [];
  userBooks$;
  newrequest = {} as connreq;
  array = [];
  left = [];
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
   firebase.auth().onAuthStateChanged(user => {
   if (user) {
     firebase
       .firestore()
       .doc(`/books/${this.uid}`)
       .get()
       .then(userProfileSnapshot => {
         this.n= userProfileSnapshot.data().avgrate;
         this.norate= userProfileSnapshot.data().norate;
         this.rating();
       });
   }
  });
   this.userBooks$ = this.bookservice.getLibBooks();


  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  rating(){
     this.k = 1;
     this.correct(this.n);
     this.array = Array.from({length:this.n},(v,k)=>k+1);
     this.m  = 5-this.n;
     this.left = Array.from({length:this.m},(v,k)=>k+1);
  }
  correct(n:number){
    if(this.n<=0.5){
      this.n = 0;
    }
    else if(this.n>0.5 && this.n<=1){
      this.n = 1;
    }
    else if(this.n>1 && this.n<=1.5){
      this.n = 1;
    }
    else if(this.n>1.5 && this.n<=2){
      this.n = 2;
    }
    else if(this.n>2 && this.n<=2.5){
      this.n = 2;
    }
    else if(this.n>2.5 && this.n<=3){
      this.n = 3;
    }
    else if(this.n>3 && this.n<=3.5){
      this.n = 3;
    }
    else if(this.n>3.5 && this.n<=4){
      this.n = 4;
    }
    else if(this.n>4 && this.n<=4.5){
      this.n = 5;
    }
    else{
      this.n = 5;
    }
  }
  getColor(index: number){

    switch (this.n) {
      case 1:
      case 2:
        return COLORS.RED;
      case 3:
        return COLORS.YELLOW;
      case 4:
      case 5:
        return COLORS.GREEN;
      default:
        return COLORS.GREY
    }

  }
  getCol(index: number){

    switch (this.m) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        return COLORS.GREY;
      default:
        return COLORS.GREY
    }

  }

}
