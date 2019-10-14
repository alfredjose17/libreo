import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthServiceProvider } from '../user/auth.service';
import { Router } from '@angular/router';
import { map, switchMap, first } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
@Injectable({
  providedIn: 'root'
})
export class BorrowService {
  public bk: firebase.firestore.DocumentReference;
  public req: firebase.firestore.DocumentReference;
  constructor(private afs: AngularFirestore,
              private auth: AuthServiceProvider,
              private router: Router,
              private http: HttpClient,
              public borrow: BorrowService) {

            }


              async create(
                bid: string,
                lid: string,
                status: number,

              ) {
                const { uid } = await this.auth.getUser();
                console.log('create funt uid:' + uid );
                const data = {
                  uid,
                  bid: bid,
                  lid: lid,
                  status: status
                };

                const docRef = await this.afs.collection('borrow').add(data);
                alert('Your Borrow request has been sent')
                return this.router.navigate(['tabs/books']);
              }
              getLibReq() {
                return this.auth.user$.pipe(
                  switchMap(user => {
                    return this.afs
                      .collection('borrow', ref => ref.where('lid', '==', user.uid))
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
              updatestatus(status: number, uid:string): Promise<any> {
                this.req = firebase.firestore().doc(`/borrow/${uid}`);
                return this.req.update({ status });
              }
              bor(borrow: number, status: number, borroweruid: string, borrowerlid: string, uid:string, rid:string): Promise<any> {
                this.bk = firebase.firestore().doc(`/books/${uid}`);
                this.req = firebase.firestore().doc(`/borrow/${rid}`);
                this.req.update({ status });
                this.bk.update({ borrow });
                this.bk.update({ borrowerlid });
                return this.bk.update({ borroweruid });

              }
              async delete(uid:string){
                let deletedoc = firebase.firestore().doc(`/borrow/${uid}`).delete();
              }
}
