import { gameNames } from "../constants/gameNames";
import { userNames } from "../constants/userNames";

export type gameResultType = [
  {
    threwName: string;
    timeDate: string;
    value: number;
  }
];

export type statisticsType = [
  {
    gameName: gameNames;
    results: gameResultType;
  }
];

export type gameStatisticsType = [
  {
    userName: userNames;
    statistics: statisticsType;
  }
];
