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

const defaultState: stateType = {
  developerMode: false,
  gamemode: getFirstValue(gameNames),
  language: getFirstValue(usedLangs),
  statisticMode: getFirstValue(statCalcModes),
  statisticGameMode: getFirstValue(gameNames),
  thema: getFirstValue(themas),
  gameStatistics: [{}] as gameStatisticsType,
};

class StateHandler {
  public state: stateType;
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
    function padZeros(num: number | string, length = 3): string {
      typeof num === "number" && (num = num.toString());
      while (num.length < length) {
        num = "0" + num;
      }
      return num.slice(-length);
    }

    try {
      const encoder = new TextEncoder();
      const encodedState = encoder.encode(JSON.stringify(value));

      const chCode = Array.from(encodedState)
        .map((code) => String.fromCharCode(255 - code))
        .join("");

      console.log(chCode);

      const revertedState = new Uint8Array(
        Array.from(chCode).map((code) => 255 - code.charCodeAt(0))
      );

      console.log(revertedState);
      console.log(encodedState);

      // const paddedZeroState: string[] = Array.from(encodedState).map((num) =>
      //   padZeros(num)
      // );
      // console.log(paddedZeroState.join(""));

      // const paddedZeroStateBack = Array.from(
      //   { length: Math.ceil(paddedZeroState.length / 3) },
      //   (_, i) => paddedZeroState.slice(i * 3, (i + 1) * 3)
      // ).flat(1);

      // console.log(paddedZeroStateBack);

      // const encodedStateBack = new Uint8Array(paddedZeroStateBack);

      // console.log(encodedStateBack);

      localStorage.setItem("state", JSON.stringify(encodedState.toString()));
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
