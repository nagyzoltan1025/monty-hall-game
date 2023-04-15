import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {GameComponent} from "./components/game/game.component";
import {GameService} from "./services/game/game.service";
import {ScoreboardComponent} from "./components/scoreboard/scoreboard.component";

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        GameComponent,
        ScoreboardComponent
      ],
      providers: [
        GameService
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
