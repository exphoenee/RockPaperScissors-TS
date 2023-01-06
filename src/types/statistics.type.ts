export type gameStatisticsType = {
  name: string;
  values: {
    opponent: {
      [key: string]: number;
    };
    player: {
      [key: string]: number;
    };
  };
};

export enum statModes {
  VALUE = "value",
  PERCENT = "percent",
}



type statisticsType = gameStatisticsType[];

export default statisticsType;
