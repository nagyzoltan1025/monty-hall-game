import {Component, ViewChild} from '@angular/core';
import {GameComponent} from "../game/game.component";
import {GamePhase} from "../../shared/enum/game-phase";
import {GameService} from "../../services/game/game.service";
import {QLearningService} from "../../services/q-learning/q-learning.service";
import {QtableActions} from "../../shared/enum/qtable-actions";
import {Door} from "../../shared/model/Door";
import {ScoreboardService} from "../../services/scoreboard/scoreboard.service";

@Component({
  selector: 'app-ai-player',
  templateUrl: './ai-player.component.html',
  styleUrls: ['./ai-player.component.less']
})
export class AiPlayerComponent {

  @ViewChild('game') gameComponent!: GameComponent;
  switches = 0;
  holds = 0;
  simulationSpeed = 1000;
  private selectedStrategy = "";
  private intervalId: string | number | undefined | NodeJS.Timeout;

  constructor(private gameService: GameService,
              private scoreboardService: ScoreboardService,
              private qLearningService: QLearningService) {
  }

  toggleSimulation() {
    if (this.intervalId) {
      this.stopSimulation();
    } else {
      this.startSimulation();
    }
  }

  get toggleButtonName(): string {
    if (this.isGameRunning()) {
      return "Stop";
    } else {
      return "Start";
    }
  }

  get learningRate(): number {
    return this.qLearningService.learningRate;
  }

  set learningRate(value: number) {
    this.qLearningService.learningRate = value;
  }

  get discountFactor(): number {
    return this.qLearningService.discountFactor;
  }

  set discountFactor(value: number) {
    this.qLearningService.discountFactor = value;
  }

  private gameRunner() {
    switch (this.gameService.getGamePhase()) {
      case GamePhase.DOOR_SELECTION:
        this.gameService.selectDoor(this.getRandomDoorNumber());
        break;
      case GamePhase.DOOR_SWITCHING:
        this.gameService.selectDoor(this.selectDoorNumber());
        break;
      case GamePhase.GAME_ENDED:
        this.qLearningService.updateQTable(this.selectedStrategy);
        this.gameService.initGame();
        break;
      default:
        throw new Error("Invalid game phase");
    }
  }

  private isGameRunning(): boolean {
    return !!this.intervalId;
  }

  private getRandomDoorNumber() {
    return Math.floor(Math.random() * this.gameService.NUMBER_OF_DOORS);
  }

  private selectDoorNumber(): number {
    const selectableDoors = this.getDoorsSelectableByPlayer();
    const strategy = this.qLearningService.getBestStrategy();

    switch (strategy) {
      case QtableActions.SWITCH:
        return this.handleSwitching(selectableDoors);
      case QtableActions.HOLD:
        return this.handleHolding();
      default:
        throw new Error('unknown action');
    }
  }

  private handleHolding() {
    this.selectedStrategy = QtableActions.HOLD;
    this.holds++;
    return this.gameService.getSelectedDoor().doorNumber;
  }

  private handleSwitching(selectableDoors: Door[]): number {
    this.selectedStrategy = QtableActions.SWITCH;
    this.switches++;
    const otherDoor = this.findOtherDoor(selectableDoors);
    return otherDoor.doorNumber;
  }

  private getDoorsSelectableByPlayer(): Door[] {
    const selectableDoors = this.gameService.getDoors().filter(door => !door.isOpened);
    if (selectableDoors) {
      return selectableDoors
    } else {
      throw new Error('No doors are eligible for selection');
    }
  }

  private findOtherDoor(selectableDoors: Door[]): Door {
    const otherDoor = selectableDoors.find(door => door.doorNumber === this.gameService.getSelectedDoor().doorNumber);
    if (!otherDoor) {
      throw new Error("Other door is undefined");
    } else {
      return otherDoor;
    }
  }

  private startSimulation() {
    this.switches = 0;
    this.holds = 0;
    this.scoreboardService.clearScoreBoard();
    this.qLearningService.clearQTable();
    this.intervalId = setInterval(() => this.gameRunner(), this.simulationSpeed);
  }

  private stopSimulation() {
    clearInterval(this.intervalId);
    this.intervalId = undefined;
  }
}
