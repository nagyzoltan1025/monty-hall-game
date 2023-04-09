import {Component, OnInit} from '@angular/core';
import {GameService} from "../../services/game/game.service";
import {Door} from "../../shared/model/Door";
import {GamePhase} from "../../shared/enum/GamePhase";
import {ScoreboardService} from "../../services/scoreboard/scoreboard.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
  private gamePhase: GamePhase = GamePhase.DOOR_SELECTION;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.initGame();
  }

  public selectDoor(doorNumber: number) {
    if (this.gameService.isDoorOpened(doorNumber)) {
      return;
    }

    switch (this.gamePhase) {
      case GamePhase.DOOR_SELECTION:
        this.handleDoorSelection(doorNumber);
        break;
      case GamePhase.DOOR_SWITCHING:
        this.handleDoorSwitching(doorNumber);
        break;
    }
  }

  private handleDoorSelection(doorNumber: number) {
    this.gameService.selectDoor(doorNumber);
    this.gameService.openRandomDoor();
    this.gamePhase = GamePhase.DOOR_SWITCHING;
  }

  private handleDoorSwitching(doorNumber: number) {
    this.gameService.selectDoor(doorNumber);
    this.gameService.openAllDoors();
    this.gamePhase = GamePhase.GAME_ENDED;
    this.gameService.evaluateGame();
  }

  get doors(): Array<Door> {
    return this.gameService.getDoors();
  }

  isSelectedDoor(doorNumber: number): boolean {
    return this.gameService.isSelectedDoor(doorNumber);
  }

  initGame() {
    this.gamePhase = GamePhase.DOOR_SELECTION;
    this.gameService.initDoors();
  }

  get isGameEnded(): boolean {
    return this.gamePhase === GamePhase.GAME_ENDED;
  }
}
