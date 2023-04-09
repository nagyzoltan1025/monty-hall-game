import {Injectable, Optional} from '@angular/core';
import {Door} from "../../shared/model/Door";
import {ScoreboardService} from "../scoreboard/scoreboard.service";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private readonly NUMBER_OF_DOORS = 3;

  private doors;
  private selectedDoorNumber;
  private winningDoorNumber;

  constructor(@Optional() doors: Array<Door>,
              private scoreboardService: ScoreboardService) {
    this.doors = doors ? doors: [];
    this.selectedDoorNumber = -1;
    this.winningDoorNumber = -1;
  }

  public initDoors(): void {
    this.doors = [];
    this.selectedDoorNumber = -1;
    this.generateDoors()
  }

  private generateDoors(): void {
    for (let i = 0; i < this.NUMBER_OF_DOORS; i++) {
      this.doors.push(new Door(i));
    }

    this.winningDoorNumber = Math.floor(Math.random() * this.NUMBER_OF_DOORS);

    this.doors[this.winningDoorNumber].hasPrize = true;
  }

  public selectDoor(doorNumber: number): void {
    this.selectedDoorNumber = doorNumber;
  }

  public getDoors(): Array<Door> {
    return this.doors;
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

  public openRandomDoor(): void {
    let openableDoors = this.doors.filter(door => !door.hasPrize && !door.isOpened && !this.isSelectedDoor(door.doorNumber));
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
}

