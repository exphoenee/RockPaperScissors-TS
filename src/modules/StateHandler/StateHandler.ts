import { gameNames } from "../../constants/gameNames";
import { usedLangs } from "../../constants/usedLangs";
import { statCalcModes } from "../../constants/statCalcModes";
import { gameStatisticsType } from "../../types/gameStatisticsType";
import { themas } from "../../constants/themas";

export type stateType = {
  gamemode: gameNames;
  language: usedLangs;
  statisticMode: statCalcModes;
  statisticGameMode: string;
  gameStatistics: gameStatisticsType;
  thema: themas;
};

// This is a generic function that returns the first value of an object
// It's used to get the first value of the enum usedLangs and gameNames
// to set the deafult state

function getFirstValue(obj: {}): {}[keyof {}] {
  return obj[Object.keys(obj)[0] as keyof {}];
}

const defaultState: stateType = {
  gamemode: getFirstValue(gameNames),
  language: getFirstValue(usedLangs),
  statisticMode: getFirstValue(statCalcModes),
  statisticGameMode: getFirstValue(gameNames),
  thema: getFirstValue(themas),
  gameStatistics: {} as gameStatisticsType,
};

class StateHandler {
  public state: stateType;

  constructor() {
    this.state = this.getState();
  }

  public getGameMode(): gameNames {
    return this.state.gamemode;
  }

  public setGameMode(value: gameNames): void {
    this.state.gamemode = value;
    this.setState(this.state);
  }

  public getLang(): usedLangs {
    return this.state.language;
  }

  public setLang(value: usedLangs): void {
    this.state.language = value;
    this.setState(this.state);
  }

  public getStatCalcMode(): statCalcModes {
    return this.state.statisticMode;
  }

  public setStatCalcMode(value: statCalcModes): void {
    this.state.statisticMode = value;
    this.setState(this.state);
  }

  public getStatGameMode(): string {
    return this.state.statisticGameMode;
  }

  public setStatGameMode(value: string): void {
    this.state.statisticGameMode = value;
    this.setState(this.state);
  }

  public getGameStatistics(): gameStatisticsType {
    return this.state.gameStatistics;
  }

  public setGameStatistics(value: gameStatisticsType): void {
    this.state.gameStatistics = value;
    this.setState(this.state);
  }

  public getThema(): themas {
    return this.state.thema as themas;
  }

  public setThema(value: themas): void {
    this.state.thema = value;
    this.setState(this.state);
  }

  private getState(): stateType {
    try {
      const decoder = new TextDecoder();
      const value = localStorage.getItem("state") as string;
      const encodedState = new Uint8Array(JSON.parse(value).split(","));
      const state = JSON.parse(decoder.decode(encodedState as Uint8Array));

      if (state) {
        const stateKeys = Object.keys(state);
        const defaultKeys = Object.keys(defaultState);

        const isCorrectType = defaultKeys.every((key) =>
          stateKeys.includes(key)
        );

        if (isCorrectType) {
          console.log("StateHandler: last state loaded!");
          return state;
        } else {
          console.log(
            "StateHandler: the loaded state was in incorrect format!"
          );
        }
      } else {
        console.log(
          "StateHandler: No state found, creating new default state!"
        );
      }
    } catch (e) {
      console.log("StateHandler: No state found!");
    }
    return defaultState;
  }

  private setState(value: stateType): boolean {
    try {
      const encoder = new TextEncoder();
      const encodedState = encoder.encode(JSON.stringify(value));
      localStorage.setItem("state", JSON.stringify(encodedState.toString()));
      localStorage.setItem("readable", JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default StateHandler;
