import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakandaReferenceTypesPage } from './wakanda-reference-types.page';

describe('WakandaReferenceTypesPage', () => {
  let component: WakandaReferenceTypesPage;
  let fixture: ComponentFixture<WakandaReferenceTypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakandaReferenceTypesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakandaReferenceTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
