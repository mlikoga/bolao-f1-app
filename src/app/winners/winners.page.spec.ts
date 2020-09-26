import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnersPage } from './winners.page';

describe('WinnersPage', () => {
  let component: WinnersPage;
  let fixture: ComponentFixture<WinnersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
