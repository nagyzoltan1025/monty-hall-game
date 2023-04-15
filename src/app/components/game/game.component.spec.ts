import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import {GameService} from "../../services/game/game.service";
import {ScoreboardComponent} from "../scoreboard/scoreboard.component";
import {ScoreboardService} from "../../services/scoreboard/scoreboard.service";

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        GameComponent,
        ScoreboardComponent
      ],
      providers: [
        GameService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
