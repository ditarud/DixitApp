import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchListPage } from './match-list.page';

describe('MatchListPage', () => {
  let component: MatchListPage;
  let fixture: ComponentFixture<MatchListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
