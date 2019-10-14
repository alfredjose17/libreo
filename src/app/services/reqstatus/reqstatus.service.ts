import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthServiceProvider } from '../user/auth.service';
import { Router } from '@angular/router';
import { map, switchMap, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ReqstatusService {

  constructor(private afs: AngularFirestore,
              private auth: AuthServiceProvider,
              private router: Router,
              private http: HttpClient) { }



              getLibReq() {
                return this.auth.user$.pipe(
                  switchMap(user => {
                    return this.afs
                      .collection('borrow', ref => ref.where('uid', '==', user.uid))
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
}
