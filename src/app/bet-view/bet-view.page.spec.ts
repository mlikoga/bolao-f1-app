import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BetViewPage } from './bet-view.page';

describe('BetViewPage', () => {
  let component: BetViewPage;
  let fixture: ComponentFixture<BetViewPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BetViewPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BetViewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
