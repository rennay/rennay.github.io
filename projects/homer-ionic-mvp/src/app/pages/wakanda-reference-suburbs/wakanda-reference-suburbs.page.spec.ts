import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakandaReferenceSuburbsPage } from './wakanda-reference-suburbs.page';

describe('WakandaReferenceSuburbsPage', () => {
  let component: WakandaReferenceSuburbsPage;
  let fixture: ComponentFixture<WakandaReferenceSuburbsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakandaReferenceSuburbsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakandaReferenceSuburbsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
