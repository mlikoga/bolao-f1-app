import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartialsPage } from './partials.page';

describe('PartialsPage', () => {
  let component: PartialsPage;
  let fixture: ComponentFixture<PartialsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartialsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
