import { gameNames } from "../../constants/gameNames";
import { usedLangs } from "../../constants/usedLangs";
import { statCalcModes } from "../../constants/statCalcModes";
import { gameStatisticsType } from "../../types/gameStatisticsType";
import { themas } from "../../constants/themas";

export type stateType = {
  developerMode: boolean;
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


class StateHandler {
  public state: stateType;
  private defaultState: stateType = {
    developerMode: false,
    gamemode: getFirstValue(gameNames),
    language: getFirstValue(usedLangs),
    statisticMode: getFirstValue(statCalcModes),
    statisticGameMode: getFirstValue(gameNames),
    thema: getFirstValue(themas),
    gameStatistics: [{}] as gameStatisticsType,
  };

  private localhosts: string[] = ["localhost", "127.0.0.1"];

  constructor() {
    this.state = this.getState();
    this.state.developerMode = this.checkRunsLocal();
  }

  private checkRunsLocal(): boolean {
    return !!this.localhosts.find(
      (host) => window.location.origin.indexOf(host) > -1
    );
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

  private checkState(state: typeof this.defaultState): boolean {
    const stateKeys = Object.keys(state);
    const defaultKeys = Object.keys(this.defaultState);

    return defaultKeys.every((key) => stateKeys.includes(key));
  }

  private getState(): stateType {
    try {
      const value = localStorage.getItem("state") as string;
      const state = this.decodeState(value);

      if (this.checkState(state)) {
        console.log("StateHandler: last state loaded!");
        return state;
      } else {
        console.log("StateHandler: the loaded state was in incorrect format!");
      }
    } catch (e) {
      console.log("StateHandler: No state found!");
    }
    return this.defaultState;
  }

  private decodeState(value: string): stateType {
    const chCode = Array.from(value)
      .map((code) => String.fromCharCode(255 - code.charCodeAt(0)))
      .join("")
      .slice(1, -1);
    return JSON.parse(chCode);
  }

  private encodeState(value: stateType): string {
    const encodedState = JSON.stringify(value)
      .split("")
      .map((code) => String.fromCharCode(255 - code.charCodeAt(0)))
      .join("");
    return encodedState.toString();
  }

  private setState(value: stateType): boolean {
    try {
      const encodedState = this.encodeState(value);
      localStorage.setItem("state", JSON.stringify(encodedState));
      this.state.developerMode &&
        localStorage.setItem("readable", JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default StateHandler;
