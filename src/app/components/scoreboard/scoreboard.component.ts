import {Component} from '@angular/core';
import {ScoreboardService} from "../../services/scoreboard/scoreboard.service";

@Component({
  selector: 'app-scoreboard',
  templateUrl: './scoreboard.component.html',
  styleUrls: ['./scoreboard.component.less']
})
export class ScoreboardComponent {

  constructor(private scoreBoardService: ScoreboardService) {
  }

  get total(): number {
    return this.scoreBoardService.getTotal();
  }

  get wins(): number {
    return this.scoreBoardService.getWins();
  }

  get losses(): number {
    return this.scoreBoardService.getLoses();
  }

  get winsPercent(): number {
    return this.scoreBoardService.getWinPercent();
  }
}
