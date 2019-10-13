import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WakandaCustomersHeavyPage } from './wakanda-customers-heavy.page';

describe('WakandaCustomersHeavyPage', () => {
  let component: WakandaCustomersHeavyPage;
  let fixture: ComponentFixture<WakandaCustomersHeavyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WakandaCustomersHeavyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WakandaCustomersHeavyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
