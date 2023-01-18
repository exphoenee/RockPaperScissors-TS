/* modules */
import GameUI from "./GameUI/GameUI";

/* enums */
import gameType, { gameNames } from "../types/gameType";

/* utils */
import getGameMode from "../utils/getGameMode";
import getThema from "../utils/getThema";
import getLang from "../utils/getLang";
import getStatMode from "../utils/getStatMode";
import ruleType from "../types/ruleType";

class Game {
  private appSettings: {
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
  private localhosts: string[] = ["localhost", "127.0.0.1"];
  private userChoice: ruleType;
  private opponentChoice: ruleType;
  private gameUI = new GameUI();

  constructor() {
    console.log(window.location.origin);
    this.appSettings = {
      developerMode: this.checkRunsLocal(),
      thema: getThema(),
      gameMode: getGameMode(),
      language: getLang(),
      statisticMode: getStatMode(),
      playerNames: ["player", "opponent"],
      imageLoaded: 0,
      imageCount: 0,
      popupTimeout: 3,
      computerRollLength: 15,
    };

    this.opponentChoice = this.userChoice = this.gameUI.getRules()[0];
    console.log(this.opponentChoice);
    console.log(this.userChoice);
  }

  private checkRunsLocal(): boolean {
    return !!this.localhosts.find(
      (host) => window.location.origin.indexOf(host) > -1
    );
  }
}

export default Game;
