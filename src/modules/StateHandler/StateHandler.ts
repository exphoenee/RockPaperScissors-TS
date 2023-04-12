/* constants */
import {gameNames} from "../../constants/gameNames";
import {usedLangs} from "../../constants/usedLangs";
import {statCalcModes} from "../../constants/statCalcModes";
import {gameStatisticsType} from "../../types/gameStatisticsType";
import {themas} from "../../constants/themas";

/* utils */
import getFirstValue from "../../utils/getFirstValue";

export type stateType = {
  developerMode: boolean;
  gamemode: gameNames;
  language: usedLangs;
  statisticMode: statCalcModes;
  statisticGameMode: string;
  gameStatistics: gameStatisticsType | [];
  thema: themas;
};

class StateHandler {
  public state: stateType;
  private secretKey: number = 512;
  private defaultState: stateType = {
    developerMode: false,
    gamemode: getFirstValue(gameNames),
    language: getFirstValue(usedLangs),
    statisticMode: getFirstValue(statCalcModes),
    statisticGameMode: getFirstValue(gameNames),
    thema: getFirstValue(themas),
    gameStatistics: [],
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

  public getGameStatistics(): gameStatisticsType | [] {
    return this.state.gameStatistics;
  }

  public setGameStatistics(value: gameStatisticsType | []): void {
    this.state.gameStatistics = value;
    this.setState(this.state);
  }

  public getThema(): themas {
    return this.state.thema;
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
        return state;
      } else {
        console.error("State is not valid");
      }
    } catch (e) {
      console.error("Error while getting state");
    }
    return this.defaultState;
  }

  private decodeState(value: string): stateType {
    console.log(value);
    const decoded = Array.from(value)
      .map((code) => String.fromCharCode(this.secretKey - code.charCodeAt(0)))
      .join("")
      .replaceAll("Ǟ", "");
    return JSON.parse(decoded);
  }

  private encodeState(value: stateType): string {
    const encoded = JSON.stringify(value)
      .split("")
      .map((code) => String.fromCharCode(this.secretKey - code.charCodeAt(0)))
      .join("");
    return encoded.toString();
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
