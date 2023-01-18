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
    userName: string;
    opponentName: string;
    imageLoaded: number;
    imageCount: number;
    popupTimeout: number;
    statisticMode: string;
    computerRollLength: number;
  };
  private localhosts: string[] = ["localhost", "127.0.0.1"];
  private userChoice: ruleType;
  private opponentChoice: ruleType;
  private gameUI: GameUI = new GameUI();

  constructor() {
    this.appSettings = {
      developerMode: this.checkRunsLocal(),
      thema: getThema(),
      gameMode: getGameMode(),
      language: getLang(),
      statisticMode: getStatMode(),
      userName: "You",
      opponentName: "Opponent",
      imageLoaded: 0,
      imageCount: 0,
      popupTimeout: 3,
      computerRollLength: 15,
    };

    this.gameUI.setUserName(this.appSettings.userName);
    this.gameUI.setOpponentName(this.appSettings.opponentName);
    this.opponentChoice = this.userChoice = this.gameUI.getRules()[0];

    this.gameUI.action = this.setAction.bind(this);
  }

  private checkRunsLocal(): boolean {
    return !!this.localhosts.find(
      (host) => window.location.origin.indexOf(host) > -1
    );
  }

  private setAction({
    user,
    opponent,
  }: {
    user: ruleType;
    opponent: ruleType;
  }): void {
    this.userChoice = user;
    this.opponentChoice = opponent;

    console.log(user, opponent);
  }
}

export default Game;
