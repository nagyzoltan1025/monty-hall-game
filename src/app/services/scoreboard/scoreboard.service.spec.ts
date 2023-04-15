import {TestBed} from '@angular/core/testing';

import {ScoreboardService} from './scoreboard.service';

describe('ScoreboardService', () => {
  let service: ScoreboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ScoreboardService);
  });

  describe('Wins', () => {
    it('should return 0 wins when the service is just initialized', () => {
      expect(service.getWins()).toBe(0);
    })

    it('should increase the number of wins by one', () => {
      service.addWin();
      expect(service.getWins()).toBe(1);
    });
  });

  describe('Losses', () => {
    it('should return 0 loses when the service is just initialized', () => {
      expect(service.getLoses()).toBe(0);
    });

    it('should increase the number of loses by one', () => {
      service.addLoss();
      expect(service.getLoses()).toBe(1);
    });
  });

  describe('Total', () => {
    it('should return 0 total when the service is just initialized', () => {
      expect(service.getTotal()).toBe(0);
    });

    it('should always calculate total as the sum of wins and losses', () => {
      expect(service.getTotal()).toBe(0);
      service.addWin();
      service.addLoss();
      expect(service.getTotal()).toBe(2);
    });
  });

  describe('Win Percent', () => {
    it('should return 0% winPercent when the service is just initialized', () => {
      expect(service.getWinPercent()).toBe(0);
    });

    it('should calculate the winPercent by dividing the total by the number of wins ' +
      'then multiply it by 100', () => {
      service.addWin();
      service.addLoss();
      expect(service.getWinPercent()).toBe(50);
    });
  });
});
