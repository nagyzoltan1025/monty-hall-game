import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ScoreboardComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
