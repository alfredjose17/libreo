import { Component, OnInit } from '@angular/core';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { ProfileService } from '../../services/user/profile.service';
import { AuthServiceProvider } from '../../services/user/auth.service';
@Component({
  selector: 'app-newuser',
  templateUrl: './newuser.page.html',
  styleUrls: ['./newuser.page.scss'],
})
export class NewuserPage implements OnInit {
  filteredusers = [];
  count = 0;
  constructor(public auth: AuthServiceProvider, public userservice: ProfileService) {
    this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
     })
   }

  ngOnInit() {
    this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
     })
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
