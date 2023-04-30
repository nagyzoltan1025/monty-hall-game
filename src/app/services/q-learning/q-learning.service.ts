import {Injectable} from '@angular/core';
import {GameService} from "../game/game.service";
import {QtableActions} from "../../shared/enum/qtable-actions";

@Injectable({
  providedIn: 'root'
})
export class QLearningService {

  private qTable = new Map<string, number>([
    [QtableActions.HOLD, 0],
    [QtableActions.SWITCH, 0]
  ]);
  private learningRate = 0.5;
  private discountFactor = 0.5;

  constructor(private gameService: GameService) {
  }

  public getBestStrategy(): string {
    let bestStrategyReward = -Infinity;
    let bestStrategy = "";

    for(const [strategy, qValue] of this.qTable.entries()) {
      if(bestStrategyReward < qValue) {
        bestStrategy = strategy;
        bestStrategyReward = qValue;
      }
    }

    return bestStrategy;
  }

  public updateQTable(action: string): void {
    if (!this.qTable.has(action)) {
      throw new Error('Invalid action: ' + action);
    } else {
      let qValue = (1 - this.learningRate) * this.getCurrentQValue(action) +
        this.learningRate*(this.getReward()+this.discountFactor*this.getLargestQValue());
      this.qTable.set(action, qValue);
    }
  }

  private getCurrentQValue(action: string): number {
    let reward = this.qTable.get(action);
    if (reward !== undefined) {
      return reward;
    } else {
      throw new Error('Unknown action: ' + action);
    }
  }

  private getReward() {
    if (this.gameService.isPlayerWon()) {
      return 1;
    } else {
      return -1;
    }
  }

  private getLargestQValue() {
    let largestQValue = -1;
    for(const qValue of this.qTable.values()) {
      if (largestQValue < qValue) {
        largestQValue = qValue;
      }
    }
    return largestQValue;
  }
}
