import { gameNames } from "../../constants/gameNames";
import { usedLangs } from "../../constants/usedLangs";
import { statCalcModes } from "../../constants/statCalcModes";
import { gameStatisticsType } from "../../types/gameStatisticsType";
import { themas } from "../../constants/themas";

type stateType = {
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
  private state: stateType;

  constructor() {
    this.state = this.getState();

    if (!this.state) {
      this.state = defaultState;
      console.log("StateHandler: No state found, creating new default state!");
    } else {
      const stateKeys = Object.keys(this.state);
      const defaultKeys = Object.keys(defaultState);

      const isCorrectType = defaultKeys.every((key) => stateKeys.includes(key));

      if (!isCorrectType) {
        this.state = defaultState;
        console.log("StateHandler: the loaded state was in incorrect format!");
      }
      console.log("StateHandler: last state loaded!");
    }
    this.setState(this.state);
  }

  public getState(): any {
    try {
      const value = localStorage.getItem("state");
      if (value) return JSON.parse(value);
      return null;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  public async setState(value: any): Promise<boolean> {
    try {
      const encoder = new TextEncoder();

      const byteArr = encoder.encode(value);

      console.log(byteArr);
      localStorage.setItem("state", JSON.stringify(byteArr));

      const decoder = new TextDecoder();
      const text = decoder.decode(byteArr);

      console.log(text);

      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default StateHandler;
