/* modules */
import GameUI from "./GameUI/GameUI";
import StateHandler from "./StateHandler/StateHandler";

/* enums */
import { gameNames } from "../constants/gameNames";
import { statCalcModes } from "../constants/statCalcModes";

/* constants */
import games from "../constants/games";

/* utils */
import { stateType } from "./StateHandler/StateHandler";
import ruleType from "../types/ruleType";
import { directions } from "../constants/directions";
import { usedLangs } from "../constants/usedLangs";

class GameContorller {
  private appSettings: {
    gameType: "singleplayer" | "multiplayer";
    userName: string;
    opponentName: string;
    imageLoaded: number;
    imageCount: number;
    popupTimeout: number;
    computerRollLength: number;
  };

  private userChoiceIndex: number = 0;
  private opponentChoiceIndex: number = 0;
  private userChoiceSet: boolean = false;
  private gameUI: GameUI;
  private rules: ruleType[];
  private stateHandler: StateHandler = new StateHandler();
  private state: stateType;

  constructor() {
    this.state = this.stateHandler.state;

    /* Setting up appSettings */
    this.appSettings = {
      gameType: "singleplayer",
      userName: "You",
      opponentName: "Opponent",
      imageLoaded: 0,
      imageCount: 0,
      popupTimeout: 3,
      computerRollLength: 15,
    };

    /* Setting up games */
    this.rules =
      games.find((game) => game.name === this.state.gamemode)?.rules ||
      games[0]?.rules;
    this.opponentChoiceIndex = this.userChoiceIndex = 0;

    /* Setting up gameUi */
    this.gameUI = GameUI.getInstance({
      rules: this.rules,
      stateHandler: this.stateHandler,
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

  setGameType(type: "singleplayer" | "multiplayer"): void {
    this.appSettings.gameType = type;
  }

  private setLanguage(lang: string): void {
    this.gameUI.updateLang({ rules: this.rules, lang });
    this.stateHandler.setLang(lang as usedLangs);
  }

  setGameMode(): void {
    const gameIdx = games.findIndex(
      (game) => game.name === this.state.gamemode
    );

    const newGame: gameNames =
      gameIdx !== -1
        ? (games[(gameIdx + 1) % games.length].name as gameNames)
        : (games[0].name as gameNames);

    this.rules = games.find((game) => game.name === newGame)?.rules || [];

    this.state.gamemode = newGame;
    this.gameUI.changeGameMode({
      rules: this.rules,
      lang: this.state.language,
    });
    this.stateHandler.setGameMode(newGame);
  }

  setStatCalcMode(mode: statCalcModes): void {
    this.state.statisticMode = mode;
    console.log(mode);
    this.stateHandler.setStatCalcMode(mode);
  }

  setStatGameMode(mode: gameNames): void {
    this.state.statisticGameMode = mode;
    console.log(mode);
    this.stateHandler.setGameMode(mode);
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
