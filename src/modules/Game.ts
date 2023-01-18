/* modules */
import GameUI from "./GameUI/GameUI";

/* constants */
import games from "../constants/games";

/* tpyes */
import statisticsType, { gameStatisticsType } from "../types/statistics.type";

/* enums */
import { gameNames } from "../types/gameType";

/* utils */
import isType from "../utils/isType";
import getGameMode from "../utils/getGameMode";
import getThema from "../utils/getThema";
import getLang from "../utils/getLang";

class Game {
  private appSettings: {
    baseURL: string;
    developerMode: boolean;
    gameMode: gameNames;
    thema: string;
    language: string;
    playerNames: string[];
    imageLoaded: number;
    imageCount: number;
    popupTimeout: number;
    statisticMode: string;
    computerRollLength: number;
  };
  private localhosts: string[];
  private userChoice: gameType;
  private opponentChoice: gameType;
  private gameUI = new GameUI();

  constructor() {
    this.localhosts = ["localhost", "127.0.0.1"];

    this.appSettings = {
      baseURL: window.location.origin,
      developerMode: true,
      thema: getThema(),
      gameMode: getGameMode(),
      language: getLang(),
      statisticMode: getStatsMode(),
      playerNames: ["player", "opponent"],
      imageLoaded: 0,
      imageCount: 0,
      popupTimeout: 3,
      computerRollLength: 15,
    };

    this.opponentChoice = this.userChoice = this.gameUI.getRules()[0];

    this.initialize();
  }

  private checkRunsLocal() {
    const hostedLocally = this.localhosts.find(
      (host) => this.appSettings.baseURL.indexOf(host) > -1
    );
    this.appSettings.developerMode = !!hostedLocally;
  }

  private initStatMode() {
    const statMode = localStorage.getItem("statisticMode");
    if (statMode) {
      this.appSettings.statisticMode = statMode;
      const statSelector = this.elem.single.statisticsInput as HTMLInputElement;

      statSelector.value = statMode;
    }
  }

  private initStatistics(): statisticsType {
    let statistics: statisticsType;

    statistics = games.map((game) => {
      return {
        name: game.name,
        values: {
          opponent: game.rules.reduce(
            (acc: { [key: string]: number }, rule) => {
              acc[rule.value] = 0;
              return acc;
            },
            {}
          ),
          player: game.rules.reduce((acc: { [key: string]: number }, rule) => {
            acc[rule.value] = 0;
            return acc;
          }, {}),
        },
      };
    });

    const oldStatStr = localStorage.getItem("statistics");
    const oldStat = oldStatStr ? JSON.parse(oldStatStr) : {};

    if (isType(oldStat, statistics)) statistics = oldStat;

    return statistics;
  }

  private initialize() {
    window.onload = () => {
      /* DOM elements */
    };
  }
}

export default Game;
