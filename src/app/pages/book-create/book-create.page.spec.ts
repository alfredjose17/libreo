import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookCreatePage } from './book-create.page';

describe('BookCreatePage', () => {
  let component: BookCreatePage;
  let fixture: ComponentFixture<BookCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
