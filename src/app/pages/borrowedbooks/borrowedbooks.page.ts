import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../services/user/auth.service';
import { BooksService } from '../../services/books/books.service';
import { ProfileService } from '../../services/user/profile.service';

import { ReturnService } from '../../services/return/return.service';

@Component({
  selector: 'app-borrowedbooks',
  templateUrl: './borrowedbooks.page.html',
  styleUrls: ['./borrowedbooks.page.scss'],
})
export class BorrowedbooksPage implements OnInit {
  userBooks$;
  filteredusers = [];
  constructor(public auth: AuthServiceProvider, public bs: BooksService, public userservice: ProfileService, public ret: ReturnService,) {
    this.userservice.getallusers().then((res: any) => {
        this.filteredusers = res;
     })
    }

  ngOnInit() {
    this.userBooks$ = this.bs.getLibBooks();
  }
  doRefresh(event) {
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }
  rate(){
    alert('Please Rate the Book')
  }

}
