import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowReqPage } from './borrow-req.page';

describe('BorrowReqPage', () => {
  let component: BorrowReqPage;
  let fixture: ComponentFixture<BorrowReqPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowReqPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowReqPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
