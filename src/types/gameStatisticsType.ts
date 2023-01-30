import { gameNames } from "../constants/gameNames";
import { userNames } from "../constants/userNames";

export type threwStatisticsType = [
  {
    threwName: string;
    timeDate: string;
    value: number;
  }
];

export type userStatisticsType = [
  {
    userName: userNames;
    results: threwStatisticsType;
  }
];

export type gameStatisticsType = [
  {
    gameName: gameNames;
    statistics: userStatisticsType;
  }
];
