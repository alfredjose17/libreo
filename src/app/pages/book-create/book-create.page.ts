import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BooksService } from '../../services/books/books.service';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner/ngx';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.page.html',
  styleUrls: ['./book-create.page.scss'],
})
export class BookCreatePage implements OnInit {
  options: BarcodeScannerOptions;
  scannedData:any={};
  results: Observable<any>;
  searchTerm: string = '';
  m = '0';
  l = '0';
  constructor(public navCtrl: NavController, private router: Router, private bookService: BooksService,public scanner: BarcodeScanner) { }

  ngOnInit() {}

  createBook(
    bookname: string,
    bookid: string,
    libraryname: string,
    authors: string="Null",
    publisher: string="Null",
    imglink: string="Null",
    language: string="Null",
    bookdescription: string="NUll",
    borrow: number,
    borroweruid: string,
    borrowerlid: string,
    avgrate: number,
    totrate: number,
    norate: number,


  ): void {
    if (
      bookname === undefined ||
      bookid === undefined ||
      libraryname === undefined
    ) {
      return;
    }
    this.bookService
      .createBook(bookname, bookid, libraryname, authors, publisher, imglink, language, bookdescription, borrow, borroweruid, borrowerlid, avgrate, totrate, norate)
      .then(() => {
        this.router.navigateByUrl('');
      });
  }
  scan(){
    this.options= {
      prompt: 'Scan your Barcode'
    };
    this.scanner.scan(this.options).then((data) => {
      this.scannedData = data;
    }, (err) => {
      console.log('Error:', err);
    })
  }
  searchChanged() {
    // Call our service function which returns an Observable

    this.results = this.bookService.searchData(this.searchTerm);
    console.log('Error:', this.results);
    }



}
