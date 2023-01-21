/* modules */
import GameUI from "./GameUI/GameUI";

/* enums */
import { gameNames } from "../constants/gameNames";
import { statCalcModes } from "../constants/statCalcModes";

/* constants */
import games from "../constants/games";

/* utils */
import getGameMode from "../utils/getGameMode";
import setGameMode from "../utils/setGameMode";
import getThema from "../utils/getThema";
import setLang from "../utils/setLang";
import getLang from "../utils/getLang";
import getStatCalcMode from "../utils/getStatCalcMode";
import setStateCalcMode from "../utils/setStatCalcMode";
import getStatGameMode from "../utils/getStatGameMode";
import setStateGameMode from "../utils/setStatGameMode";
import ruleType from "../types/ruleType";
import { directions } from "../constants/directions";

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
    statCalcMode: statCalcModes;
    statGameMode: gameNames;
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
      statCalcMode: getStatCalcMode(),
      statGameMode: getStatGameMode(),
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
    this.gameUI = GameUI.getInstance({
      rules: this.rules,
      lang: this.appSettings.language,
    });

    this.gameUI.setUserName(this.appSettings.userName);
    this.gameUI.setOpponentName(this.appSettings.opponentName);

    this.gameUI.setChoice = this.setChoice.bind(this);
    this.gameUI.changeChoice = this.setUserChoice.bind(this);

    this.gameUI.setStatCalcMode = this.setStatCalcMode.bind(this);
    this.gameUI.setStatGameMode = this.setStatGameMode.bind(this);
    this.gameUI.setGameMode = this.setGameMode.bind(this);
    this.gameUI.setLanguage = this.setLanguage.bind(this);
  }

  private checkRunsLocal(): boolean {
    return !!this.localhosts.find(
      (host) => window.location.origin.indexOf(host) > -1
    );
  }

  setGameType(type: "singleplayer" | "multiplayer"): void {
    this.appSettings.gameType = type;
  }

  private setLanguage(lang: string): void {
    this.appSettings.language = lang;
    this.gameUI.updateLang({ rules: this.rules, lang });
    setLang(lang);
  }

  setGameMode(): void {
    const gameIdx = games.findIndex(
      (game) => game.name === this.appSettings.gameMode
    );

    const newGame: gameNames =
      gameIdx !== -1
        ? (games[(gameIdx + 1) % games.length].name as gameNames)
        : (games[0].name as gameNames);

    this.rules = games.find((game) => game.name === newGame)?.rules || [];

    this.appSettings.gameMode = newGame;
    this.gameUI.changeGameMode({
      rules: this.rules,
      lang: this.appSettings.language,
    });
    setGameMode(newGame);
  }

  setStatCalcMode(mode: statCalcModes): void {
    this.appSettings.statCalcMode = mode;
    console.log(mode);
    setStateCalcMode(mode);
  }

  setStatGameMode(mode: gameNames): void {
    this.appSettings.statGameMode = mode;
    console.log(mode);
    setStateGameMode(mode);
  }

  private setUserChoice(direction: directions): number {
    const possibleChoices = this.rules.length;

    this.userChoiceIndex =
      direction === directions.NEXT
        ? (this.userChoiceIndex + 1) % possibleChoices
        : (this.userChoiceIndex + possibleChoices - 1) % possibleChoices;

    return this.userChoiceIndex;
  }

  private computerPlay(): void {
    this.opponentChoiceIndex = Math.floor(Math.random() * this.rules.length);
    this.gameUI.startComputerAnimation({
      choosen: this.opponentChoiceIndex,
      rules: this.rules,
    });
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
