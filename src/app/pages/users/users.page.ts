import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../services/user/auth.service';

import { ProfileService } from '../../services/user/profile.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {
  filteredusers = [];
  constructor(public auth: AuthServiceProvider,public userservice: ProfileService) {
    this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
     })
    }

  ngOnInit() {
  }

  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

}
