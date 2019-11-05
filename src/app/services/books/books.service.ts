import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthServiceProvider } from '../user/auth.service';
import { Router } from '@angular/router';
import { firestore } from 'firebase/app';
import { map, switchMap, first } from 'rxjs/operators';
import { Observable, combineLatest, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { ActivatedRoute } from '@angular/router';


// import 'firebase/firestore';
// import 'firebase/storage';


@Injectable({
  providedIn: 'root'
})
export class BooksService {
  url='https://www.googleapis.com/books/v1/volumes';
  apiKey = 'AIzaSyB6cH9ugGfW3-9Dm415GqF7D3-CKxMryck';
  n:any ={};
  constructor(
    // public afs: firebase.firestore,
    private afs: AngularFirestore,
    private auth: AuthServiceProvider,
    private router: Router,
    private http: HttpClient
  ) {}
  searchData(isbn: string): Observable<any> {
    console.log('isbn',isbn)
    return this.http.get(`${this.url}?q=isbn%3D${encodeURI(isbn)}&key=${this.apiKey}`).pipe(
      map(results => results['items'])
    );
  }



  get(bookId) {
    return this.afs
      .collection<any>('books')
      .doc(bookId)
      .snapshotChanges()
      .pipe(
        map(doc => {
          return { id: doc.payload.id, ...doc.payload.data() };
        })
      );
  }
  async getallbooks(){

    const snapshot = await firebase.firestore().collection('books').get()
    return snapshot.docs.map(doc => doc.data());
  }

  getLibBooks() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection('books', ref => ref.where('libraryname', '==', user.libraryname))
          .snapshotChanges()
          .pipe(
            map(actions => {
              return actions.map(a => {
                const data: Object = a.payload.doc.data();
                const id = a.payload.doc.id;
                return { id, ...data };
              });
            })
          );
      })
    );
  }


  getChatRoom() {
    return this.auth.user$.pipe(
      switchMap(user => {
        return this.afs
          .collection('chats', ref => ref.where('uid', '==', user.uid))
          .snapshotChanges()
          .pipe(first()).toPromise();
      })
    );
  }

  async createBook(
    bookname: string,
    bookid: string,
    libraryname: string,
    authors: string,
    publisher: string,
    imglink: string,
    language: string,
    bookdescription: string,
    borrow: number,
    borroweruid: string,
    borrowerlid: string,
    avgrate: number,
    totrate: number,
    norate: number,
  ) {
    const { uid } = await this.auth.getUser();
    console.log('create funt uid:' + uid );
    const data = {
      uid,
      bookname: bookname,
      bookid: bookid,
      libraryname: libraryname,
      authors: authors,
      publisher: publisher,
      imglink: imglink,
      language: language,
      bookdescription: bookdescription,
      borrow: borrow,
      borroweruid: borroweruid,
      borrowerlid: borrowerlid,
      avgrate: avgrate,
      totrate: totrate,
      norate: norate,
      added: firebase.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await this.afs.collection('books').add(data);
    alert('Book has been added to the library')
    return this.router.navigate(['tabs/book-create']);
  }



  // async deleteMessage(chat, msg) {
  //   const { uid } = await this.auth.getUser();
  //
  //   const ref = this.afs.collection('chats').doc(chat.id);
  //   console.log(msg);
  //   if (chat.uid === uid || msg.uid === uid) {
  //     // Allowed to delete
  //     delete msg.user;
  //     return ref.update({
  //       messages: firestore.FieldValue.arrayRemove(msg)
  //     });
  //   }
  // }

  // joinUsers(chat$: Observable<any>) {
  //   let chat;
  //   const joinKeys = {};
  //
  //   return chat$.pipe(
  //     switchMap(c => {
  //       // Unique User IDs
  //       chat = c;
  //       const uids = Array.from(new Set(c.messages.map(v => v.uid)));
  //
  //       // Firestore User Doc Reads
  //       const userDocs = uids.map(u =>
  //         this.afs.doc(`users/${u}`).valueChanges()
  //       );
  //
  //       return userDocs.length ? combineLatest(userDocs) : of([]);
  //     }),
  //     map(arr => {
  //       arr.forEach(v => (joinKeys[(<any>v).uid] = v));
  //       chat.messages = chat.messages.map(v => {
  //         return { ...v, user: joinKeys[v.uid] };
  //       });
  //
  //       return chat;
  //     })
  //   );
  // }
}
