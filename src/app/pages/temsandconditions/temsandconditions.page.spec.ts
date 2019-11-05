import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TemsandconditionsPage } from './temsandconditions.page';

describe('TemsandconditionsPage', () => {
  let component: TemsandconditionsPage;
  let fixture: ComponentFixture<TemsandconditionsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TemsandconditionsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TemsandconditionsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
