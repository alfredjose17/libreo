import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserPage } from './newuser.page';

describe('NewuserPage', () => {
  let component: NewuserPage;
  let fixture: ComponentFixture<NewuserPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewuserPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
