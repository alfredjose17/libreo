import { Injectable } from '@angular/core';

import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, first, map } from 'rxjs/operators';
import { usercreds } from '../../models/interfaces/usercreds';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceProvider {
  user$: Observable<any>;
  public req: firebase.firestore.DocumentReference;
  private loggedIn = new BehaviorSubject<boolean>(false); // {1}

   get isLoggedIn() {
     return this.loggedIn.asObservable(); // {2}
   }
  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router,

  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<any>(`users/${user.uid}`).valueChanges();
        }else{
          return of(null);
        }
      }
      )
    )
  };

  joinUser(newuser): Promise<void>{
    return firebase
    .auth()
    .createUserWithEmailAndPassword(newuser.email,newuser.password)
    .then((newUserCredential: firebase.auth.UserCredential) => {
      const uid = newUserCredential.user.uid;
      firebase
        .firestore()
        .doc(`/users/${newUserCredential.user.uid}`)
        .set({ uid, email: newuser.email, displayName: newuser.displayName, usertype: newuser.usertype, libraryid: newuser.libraryid, librarianid: newuser.librarianid, libraryname: "MEC", cs: newuser.cs});
    })
    .catch(error => {
      console.error(error);
      throw new Error(error);
    });
  }
  login(credentials: usercreds) {
    var promise = new Promise((resolve, reject) => {
      this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password).then(() => {
        this.loggedIn.next(true);
        resolve(true);
      }).catch((err) => {
        reject(err);
        alert('user name or password wrong');
       })
    })

    return promise;

  }

  logoutUser(): Promise<void>{
    this.loggedIn.next(false);
    return firebase.auth().signOut();
  }
  getUser() {
    // console.log('Auth service getuser: '+ this.user$);
    return this.user$.pipe(first()).toPromise();
  }
  async getallusers(){

    const snapshot = await firebase.firestore().collection('users').get()
    return snapshot.docs.map(doc => doc.data());
  }
  updatecs(cs: number, uid:string): Promise<any> {
    this.req = firebase.firestore().doc(`/users/${uid}`);
    return this.req.update({ cs });
  }
  async delete(uid:string){
    let deletedoc = firebase.firestore().doc(`/users/${uid}`).delete();
  }

}
