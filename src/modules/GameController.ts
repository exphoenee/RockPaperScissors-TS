/* modules */
import GameUI from "./GameUI/GameUI";
import StateHandler from "./StateHandler/StateHandler";
import StatisticsHandler from "./StatisticsHandler/StatisticsHandler";

/* enums */
import { gameNames } from "../constants/gameNames";
import { statCalcModes } from "../constants/statCalcModes";

/* constants */
import games from "../constants/games";
import { gameResults } from "../constants/gameResults";
import { userNames } from "../constants/userNames";

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
  private opponentChoiceSet: boolean = false;
  private gameUI: GameUI;
  private rules: ruleType[];
  private stateHandler: StateHandler = new StateHandler();
  private statisticsHandler: StatisticsHandler = new StatisticsHandler();
  private state: stateType;

  constructor() {
    this.state = this.stateHandler.state;

    this.statisticsHandler.fillStatistics(this.state.gameStatistics);

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

    /* Setting up gameUI */
    this.gameUI = GameUI.getInstance({
      rules: this.rules,
      stateHandler: this.stateHandler,
    });
    this.initializeGameUI();
  }

  initializeGameUI(): void {
    this.gameUI.setUserName(this.appSettings.userName);
    this.gameUI.setOpponentName(this.appSettings.opponentName);

    this.gameUI.setChoice = this.setChoice.bind(this);
    this.gameUI.changeChoice = this.setUserChoice.bind(this);

    this.gameUI.setStatCalcMode = this.setStatCalcMode.bind(this);
    this.gameUI.setStatGameMode = this.setStatGameMode.bind(this);
    this.gameUI.setGameMode = this.setGameMode.bind(this);
    this.gameUI.setLanguage = this.setLanguage.bind(this);

    this.gameUI.changeGameMode({
      rules: this.rules,
      lang: this.state.language,
    });

    [userNames.USER, userNames.OPPONENT].forEach((user) =>
      this.gameUI.updateScore(
        user as userNames,
        this.statisticsHandler.getScore({
          gameName: this.state.statisticGameMode,
          userName: user,
        })
      )
    );

    this.gameUI.updateStaisticsTable(
      this.statisticsHandler.getTable(
        this.state.statisticGameMode,
        this.state.statisticMode
      )
    );
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
    this.stateHandler.setStatCalcMode(mode);
  }

  setStatGameMode(mode: gameNames): void {
    this.state.statisticGameMode = mode;
    this.stateHandler.setGameMode(mode);
  }

  private setUserChoice(user: userNames, direction: directions): number {
    const newChoice = (choice: number): number => {
      const possibleChoices = this.rules.length;
      return direction === directions.NEXT
        ? (choice + 1) % possibleChoices
        : (choice + possibleChoices - 1) % possibleChoices;
    };

    if (user === userNames.USER)
      this.userChoiceIndex = newChoice(this.userChoiceIndex);
    if (user === userNames.OPPONENT)
      this.opponentChoiceIndex = newChoice(this.opponentChoiceIndex);

    return this.userChoiceIndex;
  }

  private computerPlay(): void {
    this.opponentChoiceIndex = Math.floor(Math.random() * this.rules.length);
    this.gameUI.startComputerAnimation(
      {
        choosen: this.opponentChoiceIndex,
        rules: this.rules,
      },
      () => {
        this.opponentChoiceSet = true;
        this.evaluateGame();
        this.gameUI.unfreezeUI();
      }
    );
  }

  private evaluateGame(): void {
    if (this.userChoiceSet && this.opponentChoiceSet) {
      const userChoice = this.getChoice(this.userChoiceIndex);
      const opponentChoice = this.getChoice(this.opponentChoiceIndex);

      const userWins = userChoice.beats.includes(opponentChoice.value);
      const opponentWins = opponentChoice.beats.includes(userChoice.value);

      const getWinner = (): {
        winner: string;
        winsWith: string;
        winnerName: string;
        against: string;
      } => {
        const result: gameResults =
          userWins && !opponentWins
            ? gameResults.USER
            : opponentWins && !userWins
            ? gameResults.OPPONENT
            : gameResults.DRAW;

        if (result === gameResults.DRAW) {
          return { winner: "", winsWith: "", winnerName: "", against: "" };
        }

        return {
          winner:
            result === gameResults.USER ? userNames.USER : userNames.OPPONENT,
          winnerName:
            result === gameResults.USER
              ? this.appSettings.userName
              : this.appSettings.opponentName,
          winsWith:
            result === gameResults.USER
              ? userChoice.value
              : opponentChoice.value,
          against:
            result === gameResults.USER
              ? opponentChoice.value
              : userChoice.value,
        };
      };

      const { winner, winnerName, winsWith, against } = getWinner();

      this.gameUI.showResult({
        winner: winnerName,
        winsWith,
        against,
      });

      if (winner !== "") {
        const score = this.statisticsHandler.addScore({
          gameName: this.state.gamemode,
          userName: winner,
          threwName: winsWith,
          timeDate: false,
        });

        const gameStatistics = this.statisticsHandler.getStatistics();
        this.stateHandler.setGameStatistics(gameStatistics);
        this.gameUI.updateScore(winner as userNames, score);
        this.gameUI.updateStaisticsTable(
          this.statisticsHandler.getTable(
            this.state.statisticGameMode,
            this.state.statisticMode
          )
        );
      }

      this.userChoiceSet = false;
      this.opponentChoiceSet = false;
    }
  }

  getChoice(index: number): ruleType {
    return this.rules[index];
  }

  private setChoice(isUserChoiceSet: boolean): void {
    this.userChoiceSet = isUserChoiceSet;

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
