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

function getFirstValue<T>(obj: T): T[keyof T] {
  return obj[Object.keys(obj)[0] as keyof T];
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

    const stateKeys = Object.keys(this.state);
    const defaultKeys = Object.keys(defaultState);

    const isCorrectType = defaultKeys.every((key) => stateKeys.includes(key));

    if (!this.state || !isCorrectType) {
      this.state = defaultState;
      this.setState(defaultState);
      console.log("StateHandler: No state found, creating new default state!");
    }
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

  public setState(value: any): boolean {
    try {
      localStorage.setItem("state", JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}

export default StateHandler;
