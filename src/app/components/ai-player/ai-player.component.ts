import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {GameComponent} from "../game/game.component";
import {GamePhase} from "../../shared/enum/GamePhase";

@Component({
  selector: 'app-ai-player',
  templateUrl: './ai-player.component.html',
  styleUrls: ['./ai-player.component.less']
})
export class AiPlayerComponent implements AfterViewInit {
  @ViewChild('game') gameComponent!: GameComponent;

  private readonly SIMULATION_SPEED = 1000;

  ngAfterViewInit(): void {
    setInterval(() => {
      if (this.gameComponent.gamePhase === GamePhase.GAME_ENDED) {
        this.gameComponent.initGame();
      }

      let doorNumber = this.selectDoorNumber();
      this.gameComponent.selectDoor(doorNumber);
    }, this.SIMULATION_SPEED)
  }

  private selectDoorNumber(): number {
    return 0;
  }
}
