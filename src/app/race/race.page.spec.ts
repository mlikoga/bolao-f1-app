import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RacePage } from './race.page';

describe('RacePage', () => {
  let component: RacePage;
  let fixture: ComponentFixture<RacePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RacePage],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RacePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
