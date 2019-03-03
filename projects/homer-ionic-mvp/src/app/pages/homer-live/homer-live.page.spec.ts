import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomerLivePage } from './homer-live.page';

describe('HomerLivePage', () => {
  let component: HomerLivePage;
  let fixture: ComponentFixture<HomerLivePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomerLivePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomerLivePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
