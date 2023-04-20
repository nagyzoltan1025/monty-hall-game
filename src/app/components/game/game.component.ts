import {Component, ElementRef, OnInit, QueryList, ViewChildren} from '@angular/core';
import {GameService} from "../../services/game/game.service";
import {Door} from "../../shared/model/Door";
import {GamePhase} from "../../shared/enum/GamePhase";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.less']
})
export class GameComponent implements OnInit {
  @ViewChildren('door') doorElements!: QueryList<ElementRef>;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.initGame();
  }

  initGame() {
    this.gameService.initGame();
  }

  selectDoor(doorNumber: number) {
    this.gameService.selectDoor(doorNumber);
  }

  isSelectedDoor(doorNumber: number): boolean {
    return this.gameService.isSelectedDoor(doorNumber);
  }

  get isGameEnded(): boolean {
    return this.gameService.getGamePhase() === GamePhase.GAME_ENDED;
  }

  get doors(): Array<Door> {
    return this.gameService.getDoors();
  }
}
