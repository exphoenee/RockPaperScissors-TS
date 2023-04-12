/* modules */
import GameUI from "../GameUI/GameUI";
import StateHandler, {stateType} from "../StateHandler/StateHandler";
import StatisticsHandler from "../StatisticsHandler/StatisticsHandler";

/* enums */
import {gameNames} from "../../constants/gameNames";
import {statCalcModes} from "../../constants/statCalcModes";

/* constants */
import games from "../../constants/games";
import {userNames} from "../../constants/userNames";
import {gameTypes} from "../../constants/gameTypes";
import {directions} from "../../constants/directions";
import {usedLangs} from "../../constants/usedLangs";
import {gameResults} from "../../constants/gameResults";

/* utils */
import ruleType from "../../types/ruleType";

class GameContorller {
  public appSettings: {
    gameType: gameTypes;
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
  public rules: ruleType[];
  public stateHandler: StateHandler = new StateHandler();
  private statisticsHandler: StatisticsHandler = new StatisticsHandler();
  public state: stateType;

  constructor() {
    this.state = this.stateHandler.state;

    this.statisticsHandler.fillStatistics(this.state.gameStatistics);

    /* Setting up appSettings */
    this.appSettings = {
      gameType: gameTypes.SINGLE_PLAYER,
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
    this.gameUI = GameUI.getInstance(this);
    this.initializeGameUI();
  }

  initializeGameUI(): void {
    this.gameUI.setUserName();
    this.gameUI.setOpponentName();

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
        user,
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

  setGameType(type: gameTypes): void {
    this.appSettings.gameType = type;
  }

  private setLanguage(lang: string): void {
    this.gameUI.updateLang({rules: this.rules, lang});
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

  getWinner = (): {
    winner: string;
    winsWith: string;
    winnerName: string;
    against: string;
  } => {
    const userChoice = this.getChoice(this.userChoiceIndex);
    const opponentChoice = this.getChoice(this.opponentChoiceIndex);
    const userWins = userChoice.beats.includes(opponentChoice.value);
    const opponentWins = opponentChoice.beats.includes(userChoice.value);

    const result: gameResults =
      userWins && !opponentWins
        ? gameResults.USER
        : opponentWins && !userWins
        ? gameResults.OPPONENT
        : gameResults.DRAW;

    if (result === gameResults.DRAW) {
      return {winner: "", winsWith: "", winnerName: "", against: ""};
    }

    return {
      winner: result === gameResults.USER ? userNames.USER : userNames.OPPONENT,
      winnerName:
        result === gameResults.USER
          ? this.appSettings.userName
          : this.appSettings.opponentName,
      winsWith:
        result === gameResults.USER ? userChoice.value : opponentChoice.value,
      against:
        result === gameResults.USER ? opponentChoice.value : userChoice.value,
    };
  };

  private evaluateGame(): void {
    if (this.userChoiceSet && this.opponentChoiceSet) {
      const {winner, winnerName, winsWith, against} = this.getWinner();

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
