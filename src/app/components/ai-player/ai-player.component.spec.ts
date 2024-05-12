import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiPlayerComponent } from './ai-player.component';
import {GameComponent} from "../game/game.component";
import {ScoreboardComponent} from "../scoreboard/scoreboard.component";
import {NO_ERRORS_SCHEMA} from "@angular/core";

describe('AiPlayerComponent', () => {
  let component: AiPlayerComponent;
  let fixture: ComponentFixture<AiPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AiPlayerComponent, GameComponent, ScoreboardComponent ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
