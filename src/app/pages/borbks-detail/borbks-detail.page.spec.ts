import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BorbksDetailPage } from './borbks-detail.page';

describe('BorbksDetailPage', () => {
  let component: BorbksDetailPage;
  let fixture: ComponentFixture<BorbksDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BorbksDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BorbksDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
