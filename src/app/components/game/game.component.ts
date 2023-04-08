import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game.service";
import {GamePhase} from "../../shared/enum/GamePhase";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.initPrize();
  }

  get doors(): Array<boolean> {
    return this.gameService.getDoors();
  }

  selectDoor(doorNumber: number) {
    if (!this.isOpened(doorNumber)) {
      this.handleDoorSelection(doorNumber);
    }
  }

  private handleDoorSelection(doorNumber: number) {
    switch (this.gameService.getGamePhase()) {
      case GamePhase.DOOR_SELECTION:
        this.gameService.setSelectedDoor(doorNumber);
        this.gameService.openDoor();
        this.gameService.setGamePhase(GamePhase.DOOR_SWITCHING);
        break;
      case GamePhase.DOOR_SWITCHING:
        this.gameService.setSelectedDoor(doorNumber);
        this.gameService.setGamePhase(GamePhase.GAME_ENDED);
    }
  }

  isSelected(doorNumber: number): boolean {
    return this.gameService.getSelectedDoor() === doorNumber;
  }

  isOpened(doorNumber: number): boolean {
    return this.gameService.getOpenedDoor() === doorNumber;
  }
}
