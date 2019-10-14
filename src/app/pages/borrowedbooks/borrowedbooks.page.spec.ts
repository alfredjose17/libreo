import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorrowedbooksPage } from './borrowedbooks.page';

describe('BorrowedbooksPage', () => {
  let component: BorrowedbooksPage;
  let fixture: ComponentFixture<BorrowedbooksPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorrowedbooksPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorrowedbooksPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
