import statisticsHandler from "../StatisticsHandler";
import { gameStatisticsType } from "../../../types/gameStatisticsType";
import { gameNames } from "../../../constants/gameNames";
import { userNames } from "../../../constants/userNames";

const data: gameStatisticsType = [
  {
    userName: userNames.USER,
    statistics: [
      {
        gameName: gameNames.CLASSIC,
        results: [
          {
            threwName: "rock",
            value: 1,
          },
          {
            threwName: "paper",
            value: 2,
          },
          {
            threwName: "scissors",
            value: 3,
          },
        ],
      },
      {
        gameName: gameNames.BIG_BANG_THEORY,
        results: [
          {
            threwName: "rock",
            value: 1,
          },
          {
            threwName: "paper",
            value: 2,
          },
          {
            threwName: "scissors",
            value: 3,
          },
          {
            threwName: "lizard",
            value: 4,
          },
          {
            threwName: "spock",
            value: 5,
          },
        ],
      },
    ],
  },
  {
    userName: userNames.OPPONENT,
    statistics: [
      {
        gameName: gameNames.CLASSIC,
        results: [
          {
            threwName: "rock",
            value: 1,
          },
          {
            threwName: "paper",
            value: 2,
          },
          {
            threwName: "scissors",
            value: 3,
          },
        ],
      },
      {
        gameName: gameNames.BIG_BANG_THEORY,
        results: [
          {
            threwName: "rock",
            value: 1,
          },
          {
            threwName: "paper",
            value: 2,
          },
          {
            threwName: "scissors",
            value: 3,
          },
          {
            threwName: "lizard",
            value: 4,
          },
          {
            threwName: "spock",
            value: 5,
          },
        ],
      },
    ],
  },
];

console.log(data);

describe("StatisticsHandler", () => {
  it("should return the correct statistics", () => {
    const statisticsHandlre = statisticsHandler({ statistics: data });
  });
});
