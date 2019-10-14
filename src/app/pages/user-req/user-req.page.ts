import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../services/user/auth.service';
import { BooksService } from '../../services/books/books.service';
import { BorrowService } from '../../services/borrow/borrow.service';
import { ReqstatusService } from '../../services/reqstatus/reqstatus.service';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { ProfileService } from '../../services/user/profile.service';

@Component({
  selector: 'app-user-req',
  templateUrl: './user-req.page.html',
  styleUrls: ['./user-req.page.scss'],
})
export class UserReqPage implements OnInit {
  userReqs$;
  userBooks$;
  filteredusers = [];
  constructor(public auth: AuthServiceProvider, public bs: BooksService, public borrow: BorrowService, public userservice: ProfileService, public status: ReqstatusService) {
    this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
     })
   }

  ngOnInit() {
    this.userReqs$ = this.status.getLibReq();
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
