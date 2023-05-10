import {Injectable} from '@angular/core';
import {Scoreboard} from "../../shared/model/Scoreboard";

@Injectable({
  providedIn: 'root'
})
export class ScoreboardService {

  private scoreboard: Scoreboard = new Scoreboard()

  public getWins(): number {
    return this.scoreboard.wins;
  }

  public getLoses(): number {
    return this.scoreboard.losses;
  }

  public getTotal(): number {
    return this.scoreboard.wins + this.scoreboard.losses;
  }

  public getWinPercent(): number {
    const total = this.getTotal();
    return total === 0 ? 0 : (this.scoreboard.wins / total) * 100;
  }

  public addWin() {
    this.scoreboard.wins++;
  }

  public addLoss() {
    this.scoreboard.losses++;
  }

  public clearScoreBoard() {
    this.scoreboard = new Scoreboard();
  }
}
