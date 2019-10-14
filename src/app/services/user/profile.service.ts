import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router } from '@angular/router';
import { AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public userProfile: firebase.firestore.DocumentReference;
  public currentUser: firebase.User;

  constructor(private afs: AngularFirestore,
      private router: Router
      ) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
        this.userProfile = firebase.firestore().doc(`users/${user.uid}`);
        console.log( this.userProfile );
      }
    });
  }

  getUserProfile(): firebase.firestore.DocumentReference {
    return this.userProfile;
}
  async getallusers(){

    const snapshot = await firebase.firestore().collection('users').get()
    return snapshot.docs.map(doc => doc.data());
  }



  updateName(displayName: string): Promise<any> {
    return this.userProfile.update({ displayName });
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      password
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updateEmail(newEmail).then(() => {
          this.userProfile.update({ email: newEmail });
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(
      this.currentUser.email,
      oldPassword
    );

    return this.currentUser
      .reauthenticateWithCredential(credential)
      .then(() => {
        this.currentUser.updatePassword(newPassword).then(() => {
          console.log('Password Changed');
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
}
