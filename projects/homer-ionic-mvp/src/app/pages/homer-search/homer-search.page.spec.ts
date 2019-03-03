import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomerSearchPage } from './homer-search.page';

describe('HomerSearchPage', () => {
  let component: HomerSearchPage;
  let fixture: ComponentFixture<HomerSearchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomerSearchPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomerSearchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
