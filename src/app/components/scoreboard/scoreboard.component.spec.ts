import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ScoreboardComponent} from './scoreboard.component';
import {GameService} from "../../services/game/game.service";
import {ScoreboardService} from "../../services/scoreboard/scoreboard.service";

describe('ScoreboardComponent', () => {
  let component: ScoreboardComponent;
  let fixture: ComponentFixture<ScoreboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScoreboardComponent],
      providers: [
        ScoreboardService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ScoreboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
