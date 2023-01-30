import { gameNames } from "../constants/gameNames";
import { userNames } from "../constants/userNames";

export type threwStatisticsType = [
  {
    threwName: string;
    wins: string[];
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
