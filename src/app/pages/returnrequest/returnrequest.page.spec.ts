import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnrequestPage } from './returnrequest.page';

describe('ReturnrequestPage', () => {
  let component: ReturnrequestPage;
  let fixture: ComponentFixture<ReturnrequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnrequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnrequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
