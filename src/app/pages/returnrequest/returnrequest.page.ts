import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../services/user/auth.service';
import { BooksService } from '../../services/books/books.service';
import { ReturnService } from '../../services/return/return.service';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { ProfileService } from '../../services/user/profile.service';

@Component({
  selector: 'app-returnrequest',
  templateUrl: './returnrequest.page.html',
  styleUrls: ['./returnrequest.page.scss'],
})
export class ReturnrequestPage implements OnInit {
  userReqs$;
  userBooks$;
  filteredusers = [];
  constructor(public auth: AuthServiceProvider, public bs: BooksService, public ret: ReturnService, public userservice: ProfileService) {
    this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
     })
   }

  ngOnInit() {
    this.userReqs$ = this.ret.getLibReq();
    this.userBooks$ = this.bs.getLibBooks();
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  }
