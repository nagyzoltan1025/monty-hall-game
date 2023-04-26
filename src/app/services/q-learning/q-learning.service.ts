import {Injectable} from '@angular/core';
import {GameService} from "../game/game.service";
import {QTableActions} from "../../shared/enum/QTableActions";

@Injectable({
  providedIn: 'root'
})
export class QLearningService {

  private qTable = new Map<string, number>([
    [QTableActions.HOLD, 0],
    [QTableActions.SWITCH, 0]
  ]);
  private learningRate = 0.5;
  private discountFactor = 0.5;

  constructor(private gameService: GameService) {
  }

  public getBestStrategy(): string {
    let bestStrategyReward = -1;
    let bestStrategy = "";

    for(const [strategy, reward] of this.qTable.entries()) {
      if(bestStrategyReward < reward) {
        bestStrategy = strategy;
        bestStrategyReward = reward;
      }
    }

    return bestStrategy;
  }

  public updateQTable(action: string): void {
    if (this.qTable.has(action)) {
      let reward = this.getReward(action);
      // let qValue = (1 - this.learningRate) * this.qTable.get(action) + this.learningRate*(reward+this.discountFactor*)
    }
  }

  private getReward(action: string) {

    return 1;
  }

  private maxQValue() {
    // return this.qTable.
  }
}
