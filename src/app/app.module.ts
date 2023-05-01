import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { ScoreboardComponent } from './components/scoreboard/scoreboard.component';
import { AiPlayerComponent } from './components/ai-player/ai-player.component';
import { MenuComponent } from './components/menu/menu.component';
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    ScoreboardComponent,
    AiPlayerComponent,
    MenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
