import { Component, OnInit } from '@angular/core';
import { AuthServiceProvider } from '../../services/user/auth.service';
import { BooksService } from '../../services/books/books.service';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/database';
import { ProfileService } from '../../services/user/profile.service';
@Component({
  selector: 'app-books',
  templateUrl: './books.page.html',
  styleUrls: ['./books.page.scss'],
})
export class BooksPage implements OnInit {
  userBooks$;
  filteredusers = [];
  constructor(public auth: AuthServiceProvider, public bs: BooksService,public userservice: ProfileService) {
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

}
