import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakandaCustomersLightPage } from './wakanda-customers-light.page';

describe('WakandaCustomersLightPage', () => {
  let component: WakandaCustomersLightPage;
  let fixture: ComponentFixture<WakandaCustomersLightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakandaCustomersLightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakandaCustomersLightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
