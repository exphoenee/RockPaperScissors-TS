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
  private userChoice: ruleType;
  private userChoiceIndex: number;
  private opponentChoice: ruleType;
  private opponentChoiceIndex: number;
  private gameUI: GameUI = new GameUI();
  private rules: ruleType[];

  constructor() {
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

    this.gameUI.setUserName(this.appSettings.userName);
    this.gameUI.setOpponentName(this.appSettings.opponentName);

    this.rules = games.find((game) => game.name === this.appSettings.gameMode)?.rules  || games[0]?.rules;

    this.opponentChoice = this.userChoice = this.rules[0];

    this.gameUI.action = this.setChoice.bind(this);
    this.gameUI.changeChoice = this.setUserChoice.bind(this);
  }

  private checkRunsLocal(): boolean {
    return !!this.localhosts.find(
      (host) => window.location.origin.indexOf(host) > -1
    );
  }

  private setUserChoice(direction: "next" | "prev"): number {
    console.log(direction);

    const possibleChoices = this.rules.length;

    direction === "next"
      ? this.userChoiceIndex++ % possibleChoices
      : this.userChoiceIndex-- % possibleChoices;

    return this.userChoiceIndex;
  }

  private computerPlay(): void {
    const rules = this.gameUI.getRules();
    const random = Math.floor(Math.random() * rules.length);
    this.opponentChoice = rules[random];
    this.gameUI.startComputer(random);
  }

  private setChoice(userChoice: ruleType): void {
    this.userChoice = userChoice;

    if (this.appSettings.gameType === "singleplayer") {
      this.computerPlay();
    }
  }
}

export default GameContorller;
