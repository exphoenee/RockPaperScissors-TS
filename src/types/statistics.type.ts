export enum statCalcModes {
  VALUE = "value",
  PERCENT = "percent",
}

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

type statisticsType = gameStatisticsType[];

export default statisticsType;
