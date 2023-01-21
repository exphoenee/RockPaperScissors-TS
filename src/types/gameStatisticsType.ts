import { statCalcModes } from "../constants/statCalcModes";

export type gameStatisticsType = {
  name: statCalcModes;
  values: {
    opponent: {
      [key: string]: number;
    };
    player: {
      [key: string]: number;
    };
  };
};
