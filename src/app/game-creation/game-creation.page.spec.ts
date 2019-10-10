import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCreationPage } from './game-creation.page';

describe('GameCreationPage', () => {
  let component: GameCreationPage;
  let fixture: ComponentFixture<GameCreationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameCreationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameCreationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
