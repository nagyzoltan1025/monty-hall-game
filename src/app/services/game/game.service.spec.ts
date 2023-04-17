import {TestBed} from '@angular/core/testing';

import {GameService} from './game.service';
import {Door} from "../../shared/model/Door";
import {ScoreboardService} from "../scoreboard/scoreboard.service";

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        ScoreboardService
      ]
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(GameService);
    service.initDoors();
  });

  describe('door generation', () => {
    it('should generate doors', () => {
      expect(service.getDoors().length).toBe(3);
    });

    it('should generate doors with one prize', () => {
      let doors = service.getDoors();
      let prizeCounter = 0;
      for (let door of doors) {
        if (door.hasPrize) {
          prizeCounter++;
        }
      }

      expect(prizeCounter).toBe(1);
    });

    it('should generate doors which are not open', () => {
      let doors = service.getDoors();
      for (let door of doors) {
        expect(door.isOpened).toBe(false);
      }
    });
  });

  describe('door selection', () => {
    it('should select the door with the given door number', () => {
      let firstDoorNumberToSelect = 0;
      service.selectDoor(firstDoorNumberToSelect);
      expect(service.getSelectedDoor().doorNumber).toBe(firstDoorNumberToSelect);

      let secondDoorNumberToSelect = 2;
      service.selectDoor(secondDoorNumberToSelect);
      expect(service.getSelectedDoor().doorNumber).toBe(secondDoorNumberToSelect);
    });
  });

  describe('door opening', () => {
    it('should open an unselected no prize door ' +
      'when we select a door that contains a prize', () => {
      spyOn(Math, 'random').and.returnValue(0);

      let doors = [
        new Door(0, true, false),
        new Door(1, false, false),
        new Door(2, false, false)
      ];

      let gameService = new GameService(doors, new ScoreboardService());

      gameService.selectDoor(0);

      gameService.openRandomDoor();

      expect(gameService.getDoors()[1].isOpened).toBe(true);
    });


    it('should open an unselected no prize door ' +
      'when a door is selected without a prize', () => {
      spyOn(Math, 'random').and.returnValue(0);

      let doors = [
        new Door(0, true, false),
        new Door(1, false, false),
        new Door(2, false, false)
      ];

      let gameService = new GameService(doors, new ScoreboardService());

      gameService.selectDoor(1);

      gameService.openRandomDoor();

      expect(gameService.getDoors()[2].isOpened).toBe(true);
    });
  });
});