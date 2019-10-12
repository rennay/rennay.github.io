import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakandaIdentityPage } from './wakanda-identity.page';

describe('WakandaIdentityPage', () => {
  let component: WakandaIdentityPage;
  let fixture: ComponentFixture<WakandaIdentityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakandaIdentityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakandaIdentityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
