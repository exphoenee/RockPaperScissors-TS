/* modules */
import GameUI from "./GameUI/GameUI";

/* enums */
import gameType, { gameNames } from "../types/gameType";

/* constants */
import games from "../constants/games";

/* utils */
import getGameMode from "../utils/getGameMode";
import getThema from "../utils/getThema";
import getLang from "../utils/getLang";
import getStatMode from "../utils/getStatMode";
import ruleType from "../types/ruleType";

class GameContorller {
  private appSettings: {
    developerMode: boolean;
    gameMode: gameNames;
    gameType: "singleplayer" | "multiplayer";
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
  private userChoiceIndex: number = 0;
  private opponentChoiceIndex: number = 0;
  private userChoiceSet: boolean = false;
  private gameUI: GameUI;
  private rules: ruleType[];

  constructor() {
    /* Setting up appSettings */
    this.appSettings = {
      developerMode: this.checkRunsLocal(),
      gameType: "singleplayer",
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

    /* Setting up games */
    this.rules =
      games.find((game) => game.name === this.appSettings.gameMode)?.rules ||
      games[0]?.rules;
    this.opponentChoiceIndex = this.userChoiceIndex = 0;

    /* Setting up gameUi */
    this.gameUI = new GameUI({ rules: this.rules });

    this.gameUI.setUserName(this.appSettings.userName);
    this.gameUI.setOpponentName(this.appSettings.opponentName);

    this.gameUI.setChoice = this.setChoice.bind(this);
    this.gameUI.changeChoice = this.setUserChoice.bind(this);
  }

  private checkRunsLocal(): boolean {
    return !!this.localhosts.find(
      (host) => window.location.origin.indexOf(host) > -1
    );
  }

  private setUserChoice(direction: "next" | "prev"): number {
    const possibleChoices = this.rules.length;

    this.userChoiceIndex =
      direction === "next"
        ? (this.userChoiceIndex + 1) % possibleChoices
        : (this.userChoiceIndex + possibleChoices - 1) % possibleChoices;

    return this.userChoiceIndex;
  }

  private computerPlay(): void {
    this.opponentChoiceIndex = Math.floor(Math.random() * this.rules.length);
    this.gameUI.startComputerAnimation(this.opponentChoiceIndex);
  }

  getChoice(index: number): ruleType {
    return this.rules[index];
  }

  private setChoice(isUserCoiceSet: boolean): void {
    this.userChoiceSet = isUserCoiceSet;

    if (this.userChoiceSet) {
      this.gameUI.freezeUI();
      if (this.appSettings.gameType === "singleplayer") {
        this.computerPlay();
      }
    } else {
      this.gameUI.unfreezeUI();
    }
  }
}

export default GameContorller;
