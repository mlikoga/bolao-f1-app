import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetPage } from './bet.page';

describe('BetPage', () => {
  let component: BetPage;
  let fixture: ComponentFixture<BetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [BetPage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
