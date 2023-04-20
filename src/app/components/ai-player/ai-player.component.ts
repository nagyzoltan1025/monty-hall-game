import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {GameComponent} from "../game/game.component";
import {GamePhase} from "../../shared/enum/GamePhase";
import {GameService} from "../../services/game/game.service";

@Component({
  selector: 'app-ai-player',
  templateUrl: './ai-player.component.html',
  styleUrls: ['./ai-player.component.less']
})
export class AiPlayerComponent implements AfterViewInit {
  @ViewChild('game') gameComponent!: GameComponent;

  constructor(private gameService: GameService) {
  }

  private readonly SIMULATION_SPEED = 1000;

  ngAfterViewInit(): void {
    setInterval(() => {
      if (this.gameService.getGamePhase() === GamePhase.GAME_ENDED) {
        this.gameService.initGame();
      }

      const doorNumber = this.selectDoorNumber();
      this.gameService.selectDoor(doorNumber);
    }, this.SIMULATION_SPEED)
  }

  private selectDoorNumber(): number {
    const selectableDoors = this.gameService.getSelectableDoors();
    return 0;
  }
}
