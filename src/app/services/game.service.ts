import {Injectable} from '@angular/core';
import {GamePhase} from "../shared/enum/GamePhase";

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private openedDoorNumber: number = -1;
  private selectedDoorNumber: number = -1;
  private prizeDoorNumber: number = Math.floor(Math.random() * 3);
  private doors: Array<boolean> = new Array<boolean>(3).fill(false);
  private gamePhase = GamePhase.DOOR_SELECTION;

  public initPrize() {
    this.doors[this.prizeDoorNumber] = true;
  }

  public getDoors(): Array<boolean> {
    return this.doors;
  }

  public getPrizeDoor(): number {
    return this.prizeDoorNumber;
  }

  public getSelectedDoor(): number {
    return this.selectedDoorNumber;
  }

  public setSelectedDoor(index: number): void {
    this.selectedDoorNumber = index;
  }

  public getOpenedDoor(): number {
    return this.openedDoorNumber;
  }


  public openDoor(): void {
    let doorNumbersWithoutPrize = this.doors
      .map((isContainsPrize: boolean, index: number) => ({index}))
      .filter(({index}) => index !== this.prizeDoorNumber && index!== this.selectedDoorNumber)
      .map(index => index);

    let selectedDoorIndex = Math.floor(Math.random() * doorNumbersWithoutPrize.length);

    this.openedDoorNumber = doorNumbersWithoutPrize[selectedDoorIndex].index;
  }

  public setGamePhase(gamePhase: GamePhase): void {
    this.gamePhase = gamePhase;
  }

  public getGamePhase(): GamePhase {
    return this.gamePhase;
  }
}

