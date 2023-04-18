import {Injectable, Optional} from '@angular/core';
import {Door} from "../../shared/model/Door";
import {ScoreboardService} from "../scoreboard/scoreboard.service";
import {GamePhase} from "../../shared/enum/GamePhase";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly NUMBER_OF_DOORS = 3;

  private doors: Array<Door>;
  private selectedDoorNumber: number;
  private winningDoorNumber: number;
  private gamePhase: string;

  constructor(@Optional() doors: Array<Door>,
              private scoreboardService: ScoreboardService) {
    this.doors = doors ? doors: [];
    this.selectedDoorNumber = -1;
    this.winningDoorNumber = -1;
    this.gamePhase = GamePhase.DOOR_SELECTION;
  }

  public initDoors(): void {
    this.doors = [];
    this.selectedDoorNumber = -1;
    this.generateDoors();
    this.gamePhase = GamePhase.DOOR_SELECTION;
  }

  private generateDoors(): void {
    for (let i = 0; i < this.NUMBER_OF_DOORS; i++) {
      this.doors.push(new Door(i));
    }

    this.winningDoorNumber = Math.floor(Math.random() * this.NUMBER_OF_DOORS);

    this.doors[this.winningDoorNumber].hasPrize = true;
  }

  public getDoors(): Array<Door> {
    return this.doors;
  }

  public getSelectableDoors(): Array<Door> {
    return this.doors.filter(door =>
      !door.hasPrize &&
      !door.isOpened &&
      !this.isSelectedDoor(door.doorNumber)
    );
  }

  public getSelectedDoor(): Door {
    return this.doors[this.selectedDoorNumber];
  }

  public isSelectedDoor(doorNumber: number): boolean {
    return doorNumber === this.selectedDoorNumber;
  }

  public isDoorOpened(doorNumber: number): boolean {
    return this.doors[doorNumber].isOpened;
  }

  private openRandomDoor(): void {
    let openableDoors = this.getSelectableDoors()
    let openableDoorNumber = Math.floor(Math.random() * openableDoors.length);
    let doorToOpen = openableDoors[openableDoorNumber];
    this.doors[doorToOpen.doorNumber].isOpened = true;
  }

  public openAllDoors(): void {
    this.doors.forEach(door => door.isOpened = true);
  }

  public evaluateGame(): void {
    let isPlayerWon = this.selectedDoorNumber === this.winningDoorNumber;
    if (isPlayerWon) {
      this.scoreboardService.addWin()
    } else {
      this.scoreboardService.addLoss();
    }
  }

  public getGamePhase(): string {
    return this.gamePhase;
  }

  public handleDoorSelection(doorNumber: number) {
    this.selectedDoorNumber = doorNumber;
    this.openRandomDoor();
    this.gamePhase = GamePhase.DOOR_SWITCHING;
  }

  public handleDoorSwitching(doorNumber: number) {
    this.selectedDoorNumber = doorNumber;
    this.openAllDoors();
    this.evaluateGame();
    this.gamePhase = GamePhase.GAME_ENDED;
  }

  public selectDoor(doorNumber: number): void {
    if (this.isDoorOpened(doorNumber) || this.doors.length < doorNumber) {
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

}

