import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {GameComponent} from "../game/game.component";
import {GamePhase} from "../../shared/enum/GamePhase";
import {GameService} from "../../services/game/game.service";
import {QLearningService} from "../../services/q-learning/q-learning.service";
import {QTableActions} from "../../shared/enum/QTableActions";
import {Door} from "../../shared/model/Door";

@Component({
  selector: 'app-ai-player',
  templateUrl: './ai-player.component.html',
  styleUrls: ['./ai-player.component.less']
})
export class AiPlayerComponent implements AfterViewInit {
  @ViewChild('game') gameComponent!: GameComponent;

  switches = 0;
  holds = 0;

  constructor(private gameService: GameService, private qLearningService: QLearningService) {
  }

  private readonly SIMULATION_SPEED = 1;
  private selectedStrategy = "";

  ngAfterViewInit(): void {
    setInterval(() => {
      switch (this.gameService.getGamePhase()) {
        case GamePhase.DOOR_SELECTION:
          this.gameService.selectDoor(this.getRandomDoorNumber());
          break;
        case GamePhase.DOOR_SWITCHING:
          this.gameService.selectDoor(this.selectDoorNumber());
          break;
        case GamePhase.GAME_ENDED:
          this.qLearningService.updateQTable(this.selectedStrategy)
          this.gameService.initGame();
          break;
        default:
          throw new Error("Invalid game phase");
      }
    }, this.SIMULATION_SPEED)
  }

  private getRandomDoorNumber() {
    return Math.floor(Math.random() * this.gameService.NUMBER_OF_DOORS);
  }

  private selectDoorNumber(): number {
    const selectableDoors = this.getDoorsSelectableByPlayer();
    const strategy = this.qLearningService.getBestStrategy();

    switch (strategy) {
      case QTableActions.SWITCH:
        this.selectedStrategy = QTableActions.SWITCH;
        let otherDoor = this.findOtherDoor(selectableDoors);
        this.switches++;
        return otherDoor.doorNumber;
      case QTableActions.HOLD:
        this.selectedStrategy = QTableActions.HOLD;
        this.holds++;
        return this.gameService.getSelectedDoor().doorNumber;
      default:
        throw new Error('unknown action');
    }
  }

  private getDoorsSelectableByPlayer(): Array<Door> {
    let selectableDoors = this.gameService.getDoors().filter(door => !door.isOpened);
    if (selectableDoors) {
      return selectableDoors
    } else {
      throw new Error('No doors are eligible for selection');
    }
  }

  private findOtherDoor(selectableDoors: Array<Door>): Door {
    let otherDoor = selectableDoors.find(door => door.doorNumber === this.gameService.getSelectedDoor().doorNumber);
    if (!otherDoor) {
      throw new Error("Other door is undefined");
    } else {
      return otherDoor;
    }
  }
}
