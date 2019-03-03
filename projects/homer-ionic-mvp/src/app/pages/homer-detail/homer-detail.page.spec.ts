import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomerDetailPage } from './homer-detail.page';

describe('HomerDetailPage', () => {
  let component: HomerDetailPage;
  let fixture: ComponentFixture<HomerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomerDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
